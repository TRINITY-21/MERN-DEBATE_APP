const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg   = require('fluent-ffmpeg')


const Prayer = require('../../models/departments/Prayer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg'|| '.png' || '.jpeg')
            cb(res.json({ Error: 'Only mp4' }, false));

    }
});

const upload = multer({
    storage: storage
}).single('file');

router.post('/upload', (req, res) => {
    upload(req, res, (err => {
        if (err) res.json({ success: false, err });
        res.status(200).json({ success: true, fileName: res.req.file.filename, filePath: res.req.file.path });
    }));
    
});


router.post("/thumbnail", (req, res) => {

    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the Prayer
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});




router.post('/prayer', (req, res) => {
    const prayer = new Prayer(req.body);

    prayer.save((err, prayer) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, prayer });
    });

}); 


router.get('/get-prayer', (req, res) => {
    Prayer.find({}).then((err, prayer) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'Prayer': prayer,
            'success': true
        })
    });
});

router.get('/prayer/:id', (req, res) => {

    Prayer.findOne({"_id": req.params.id},(err, prayer) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'Prayer': prayer
        });
    })
    
});

router.patch('/prayer/:id', (req, res) => {

    Prayer.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, prayer) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'user updated',
            'Prayer': prayer
        });
    });
    
});


router.delete('/prayer/:id', (req, res) => {
    Prayer.findOneAndDelete({ '_id': req.params.id }, (err, prayer) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'Prayer deleted'
    })
    })
    
});



module.exports = router;