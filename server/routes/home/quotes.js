const express = require('express');
const router = express.Router();
const multer = require('multer');


const Quote = require('../../models/home/Quote');

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

router.post('/quote', (req, res) => {
    const quote = new Quote(req.body);

    quote.save((err, quote) => {
        if (err) return res.json(err);

        return res.status(201).json({ 'success': true, quote });
    });

}); 


router.get('/get-quotes', (req, res) => {
    Quote.find({}).then((err, quotes) => {
        if (err) return res.json(err);

        return res.status(200).json({
            'quote': quotes,
            'success': true
        })
    });
});

router.get('/quote/:id', (req, res) => {

    Quote.findOne({"_id": req.params.id},(err, quote) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success':true,
            'quote': quote
        });
    })
    
});

router.patch('/quote/:id', (req, res) => {

    Quote.findOneAndUpdate({ "_id": req.params.id }, (req.body), (err, quote) => {
        if (err) return res.json(err);

        return res.status(201).json({
            'success': true,
            'msg': 'quote updated',
            'quote': quote
        });
    });
    
});


router.delete('/quote/:id', (req, res) => {
    Quote.findOneAndDelete({ '_id': req.params.id }, (err, quote) => {

    if (err) return res.json(err);

    return res.status(200).json({
        'success':true,
        'msg':'quote deleted'
    })
    })
    
});



module.exports = router;