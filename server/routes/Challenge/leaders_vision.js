const router = require('express').Router();
const LeadersVision = require('../../models/Challenge/leaders_visions');
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const User = require('../../models/User');



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
        if (ext !== '.jpg' && '.png' && '.jpeg' && '.mp4' && '.docx' && '.pdf') {
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
/////  upload image of book
router.post('/upload-doc', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, err });
    
        res.status(200).json({ success: true, doc: res.req.file.path, fileName: res.req.file.filename });
    });

});
/////  upload image of book
router.post('/upload-pdf', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, err });
    
        res.status(200).json({ success: true, pdf: res.req.file.path, fileName: res.req.file.filename });
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



////// ADD A LEADERS VISION

router.post('/add-leaders-vision', auth, (req, res) => {
    const leaders_vision = LeadersVision(req.body);

    leaders_vision.save((err, leaders_vision) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, leaders_vision });
    });
    
    
});


/////// list books

router.get('/fetch-leaders-vision', auth,(req, res) => {

    LeadersVision.find({})
        .populate("writer")
        .exec((err, leaders_vision) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, leaders_vision })
        })
     
});

router.get('/fetch-leader-vision/:id', auth,(req, res) => {

    LeadersVision.findOne({"_id":req.params.id})
        .populate("writer")
        .exec((err, leaders_vision) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, leaders_vision: leaders_vision })
        })
     
});

/// approve leaders visions

router.patch('/approve-leaders-vision/:id', admin, (req, res) => {

    LeadersVision.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .exec((err, leaders_vision) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, leaders_vision: leaders_vision })
        })
     
});

router.get('/fetch-approved-vision', auth, (req, res) => {

    LeadersVision.find({"approved":true})
        .populate("writer")
        .exec((err, leaders_vision) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, leaders_vision: leaders_vision })
        })
     
});


//// get trending articles

router.get('/trending/:id', auth, (req, res) => {

    vision = LeadersVision();
    
    LeadersVision.findOneAndUpdate({ "_id": req.params.id },{$set:{view_counts:++vision.view_counts}})
        
        .exec((err, comment) => {
            if (err) res.status(400).json(err);
            res.status(200).json({ success: true, trending: comment });
        });
    
        console.log(vision.view_counts)
});


router.get('/trending', auth, (req, res) => {

    LeadersVision.find().sort({view_counts:-1})
   
        .exec((err, trending) => {
            if (err) res.status(400).json(err);
            res.status(200).json({ success: true, trending: trending });
        });
    

 });

module.exports = router;