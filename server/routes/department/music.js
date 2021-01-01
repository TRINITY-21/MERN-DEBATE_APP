const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg   = require('fluent-ffmpeg')


const Music = require('../../models/departments/Music');

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
            // Will take screens at 20%, 40%, 60% and 80% of the Music
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});




router.post('/music', (req, res) => {
    const music = new Music(req.body);

    music.save((err, music) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, music });
    });

}); 


router.get('/get-music', (req, res) => {
    Music.find({}).then((err, Music) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'Music': Music,
            'success': true
        })
    });
});

router.get('/music/:id', (req, res) => {

    Music.findOne({"_id": req.params.id},(err, Music) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'Music': Music
        });
    })
    
});

router.patch('/music/:id', (req, res) => {

    Music.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, Music) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'user updated',
            'Music': Music
        });
    });
    
});


router.delete('/music/:id', (req, res) => {
    Music.findOneAndDelete({ '_id': req.params.id }, (err, Music) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'Music deleted'
    })
    })
    
});



module.exports = router;