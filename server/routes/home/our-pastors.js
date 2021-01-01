const express = require('express');
const router = express.Router();
const multer = require('multer');


const Pastors = require('../../models/home/Our-Pastors');

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

router.post('/pastors', (req, res) => {
    const pastor = new Pastors(req.body);

    pastor.save((err, pastor) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, pastor });
    });

}); 


router.get('/get-pastors', (req, res) => {
    Pastors.find({}).then((err, pastor) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'pastor': pastor,
            'success': true
        })
    });
});

router.get('/pastors/:id', (req, res) => {

    Pastors.findOne({"_id": req.params.id},(err, pastor) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'pastor': pastor
        });
    })
    
});

router.patch('/pastors/:id', (req, res) => {

    Pastors.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, pastor) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'user updated',
            'pastor': pastor
        });
    });
    
});


router.delete('/pastors/:id', (req, res) => {
    Pastors.findOneAndDelete({ '_id': req.params.id }, (err, pastor) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'Pastor deleted'
    })
    })
    
});



module.exports = router;