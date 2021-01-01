
const router = require('express').Router();
const EnterpreneurResponse = require('../../models/Challenge/responses');
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const User = require('../../models/User');
const LeadersVision = require('../../models/Challenge/leaders_visions');
const ThinkersCritique = require('../../models/Challenge/thinkers_critique');



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

router.post('/add-response', auth, (req, res) => {
    const responses = EnterpreneurResponse(req.body);

    responses.save((err, responses) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, responses });
    });
    
    
});


/////// list books

router.get('/fetch-responses', auth,(req, res) => {

    EnterpreneurResponse.find({})
        .populate("writer")
        .populate("leaders_vision")
        .populate("critique")
        .exec((err, responses) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, responses: responses })
        })
     
});

/// approve leaders visions

router.patch('/approve-responses/:id', admin, (req, res) => {

    EnterpreneurResponse.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .populate("leaders_vision")
        .populate("critique")
        .exec((err, responses) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, responses: responses })
        })
     
});

router.get('/fetch-approved-responses', auth, (req, res) => {

    EnterpreneurResponse.find({ "approved": true })
        // .populate("writer")
        .exec((err, responses) => {
            if (err) return res.status(400).json({ success: false, err });
          
            let critiques = []
            
            responses.map((response, i) => {
                critiques.push(response.critique);
            }) 
            console.log(critiques)

            ThinkersCritique.find({
                '_id': { $in: critiques }
            }).populate('writer').populate('leaders_vision')
                .exec((err, vision) => {
                    if (err) return res.status(400).send(err);
                    res.status(200).json({ success: true, vision })
                });
        });
           
            
    
            // console.log(critiques)
            // let output = []

            // for (let challenges of responses) {
            //     each = {};
             
            //     each['_id'] = challenges._id
            //     each['heading'] = challenges.heading
            //     each['summary'] = challenges.summary
            //     each['pics'] = challenges.pics
            //     each['doc'] = challenges.doc
            //     each['pdf'] = challenges.pdf
            //     each['video'] = challenges.video
            //     each['image'] = challenges.image
            //     each['approved'] = challenges.approved
            //     each['created_at'] = challenges.created_at
            //     each['issue_area'] = challenges.issue_area
            //     each['critique'] = ThinkersCritique.find({ "approved": true })
            //     each['vision'] = LeadersVision.find({ "approved": true })
 
             
            //     vision = output.push(each)
            //     console.log(output)
            //         // .exec((err, output) => {
                    
            //         //     if (err) return res.status(400).json({ success: false, err });
            //         //     res.status(200).json({ success: true, leaders_vision: output });
            //         // });
                
            //     res.status(200).json({ success: true, leaders_vision: output });

                    
                   
                
              
            
    
                    
                    
                
        


                
            // };
                     
        
                     
});
         
    

module.exports = router;