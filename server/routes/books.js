const router = require('express').Router();
const Book = require('../models/Book');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');



/////////////////  BOOKS

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`);
    },

    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && '.png' && '.jpeg') {
            cb(res.status(400).end("Error in file extenstion"), false);
        } else {
            cb(null, true);
        }
    }
});

const upload = multer({
    storage: storage,
}).single('file');


/////  upload image of book
router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, err });
    
        res.status(200).json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    });

});



/// thumbnail

// router.post('/thumbnail', (req, res) => {
//     let thumbnailPath = '';
//     let fileDuration = '';

// ffmpeg.ffprobe(req.body.filePath, function(err, metadata) {
//     console.dir(metadata);
//     console.log(metadata.format.duration);
    
//     fileDuration = metadata.format.duration;
// });

// ffmpeg(req.body.filePath)
//   .on('filenames', function(filenames) {
//       console.log('Will generate ' + filenames.join(', '));
//       thumbnailPath = 'uploads/thumbnails/' + filenames[0];
//   })
//   .on('end', function() {
//       console.log('Screenshots taken');
//       res.json({success:true, thumbnailPath: thumbnailPath, fileDuration: fileDuration})
//   })
//   .screenshots({
//     // Will take screens at 20%, 40%, 60% and 80% of the video
//     count: 3,
//       folder: 'uploads/thumbnails/',
//       size: '320x240',
//         filename:'thumbnail-%b.png'
//   });


 
// });



////// ADD A BOOK

router.post('/saveBook', (req, res) => {
    const books = Book(req.body);

    books.save((err, book) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, book });
    });
    
    
});



/////// list books


router.post('/books', (req, res) => {
     let term = req.body.search;
     let findArgs = {};
    
    console.log(findArgs)
    console.log(term)

     if (term) {
         Book.find(findArgs)
             .find({ $text: { $search: term } })
             .populate("writer")
             .exec((err, book) => {
                 if (err) return res.status(400).json({ success: false, err })
                 res.status(200).json({ success: true, books:book })
             })
     } else {
        Book.find(findArgs)
             .populate("writer")
             .exec((err, book) => {
                 if (err) return res.status(400).json({ success: false, err })
                 res.status(200).json({ success: true, books:book })
             })
     }
 
});


router.get('/dashboardbooks', (req, res) => {
   
    Book.find({}, {projection: { writer: req.body.writer }}).populate('writer').exec((err, books) => { 
        if (err) res.status(400).send(err);
        res.status(200).json({ success: true, books: books });
    })
});

// Detail of book

router.post('/getBook/:bookId', (req, res) => {
   
    Book.findOne({"_id":req.params.bookId}).populate('writer').exec((err, book) => { 
        if (err) res.status(400).send(err);
        res.status(200).json({ success: true, book});
    });
});

router.post('/dashboard', (req, res) => {
   
    Book.find({"writer":req.body.onlineUser}).populate('writer').exec((err, book) => { 
        if (err) res.status(400).send(err);
        res.status(200).json({ success: true, book});
    });
});


// Delete of book

router.post('/deleteBook', (req, res) => {
   
    Book.findOneAndDelete( {"_id":req.body.bookId})
        .exec((err, book) => {
            if (err) res.status(400).send(err);
        
            res.status(200).json({ success: true, msg: "Book Deleted" });
        });
});

// Edit of book

router.post('/editBook/:bookId', (req, res) => {

    Book.findOneAndUpdate({ "_id": req.params.bookId }, (req.body), ((err, book) => {
        if (err) res.status(400).send(err);
        
        res.status(200).json({ success: true, book });
    }));
});


// search of book

router.post('/search', (req, res) => {
    let term = req.body.search;

    
    if (term) {
        Book.find({}).find({ $text: { $search: term } })
            .populate('writer')
            .exec((err, book) => {
                if (err) res.status(400).send(err);
        
                res.status(200).json({ success: true, book });
            });
    }
        
    // } else {
        // Book.find({}).find({'title':req.body.search})
        //     .populate('writer')
        //     .exec((err, book) => {
        //         if (err) res.status(400).send(err);
    
        //         res.status(200).json({ success: true, books:book });
        //     });
    
//}

       
});


module.exports = router;