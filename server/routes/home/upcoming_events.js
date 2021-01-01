const express = require('express');
const router = express.Router();
const multer = require('multer');


const UpcomingEvent = require('../../models/home/UpcomingEvent');

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

router.post('/upcoming', (req, res) => {
    const event = new UpcomingEvent(req.body);

    event.save((err, person) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, event });
    });

}); 


router.get('/get-upcoming', (req, res) => {
    UpcomingEvent.find({}).then((err, event) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'person': event,
            'success': true
        })
    });
});

router.get('/upcoming/:id', (req, res) => {

    UpcomingEvent.findOne({"_id": req.params.id},(err, event) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'person': event
        });
    })
    
});

router.patch('/upcoming/:id', (req, res) => {

    UpcomingEvent.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, event) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'event updated',
            'person': event
        });
    });
    
});


router.delete('/upcoming/:id', (req, res) => {
    UpcomingEvent.findOneAndDelete({ '_id': req.params.id }, (err, event) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'event deleted'
    })
    })
    
});



module.exports = router;