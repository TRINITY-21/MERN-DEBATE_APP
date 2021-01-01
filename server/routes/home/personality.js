const express = require('express');
const router = express.Router();
const multer = require('multer');


const Personality = require('../../models/home/Personality');

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

router.post('/personality', (req, res) => {
    const person = new Personality(req.body);

    person.save((err, person) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, person });
    });

}); 


router.get('/get-personality', (req, res) => {
    Personality.find({}).then((err, person) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'person': person,
            'success': true
        })
    });
});

router.get('/personality/:id', (req, res) => {

    Personality.findOne({"_id": req.params.id},(err, person) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'person': person
        });
    })
    
});

router.post('/personality/:id', (req, res) => {

    Personality.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, person) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'user updated',
            'person': person
        });
    });
    
});


router.delete('/personality/:id', (req, res) => {
    Personality.findOneAndDelete({ '_id': req.params.id }, (err, person) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'personality deleted'
    })
    })
    
});



module.exports = router;