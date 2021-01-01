const express = require('express');
const router = express.Router();
const multer = require('multer');


const Executives = require('../../models/executives/Executives');

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

router.post('/executives', (req, res) => {
    const executives = new Executives(req.body);

    executives.save((err, executives) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, executives });
    });

}); 


router.get('/get-executives', (req, res) => {
    Executives.find({}).then((err, executives) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'executives': executives,
            'success': true
        })
    });
});

router.get('/executives/:id', (req, res) => {

    Executives.findOne({"_id": req.params.id},(err, executives) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'executives': executives
        });
    })
    
});

router.patch('/executives/:id', (req, res) => {

    Executives.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, executives) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'user updated',
            'executives': executives
        });
    });
    
});


router.delete('/executives/:id', (req, res) => {
    Executives.findOneAndDelete({ '_id': req.params.id }, (err, executives) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'Executives deleted'
    })
    })
    
});



module.exports = router;