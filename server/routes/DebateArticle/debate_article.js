const router = require('express').Router();
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const Article = require('../../models/Articles/articles');
const ArticleComment = require('../../models/Articles/article_comment');
const DebateArticle = require('../../models/Debate/debate_article');
const DebateThesis = require('../../models/Debate/debate_thesis');
const DebateAntiThesis = require('../../models/Debate/debate_antithesis');
const DebateSynthesis = require('../../models/Debate/debate_synthesis');




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
        if (ext !== '.jpg' && '.png' && '.jpeg' && '.mp4' && '.docx' && '.doc' && '.pdf') {
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
router.post('/upload-pdf', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, err });
    
        res.status(200).json({ success: true, pdf: res.req.file.path, fileName: res.req.file.filename });
    });

});
router.post('/upload-doc', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, err });
    
        res.status(200).json({ success: true, doc: res.req.file.path, fileName: res.req.file.filename });
    });

});


////// ADD AN ARTICLE

router.post('/add-debate-article', auth, (req, res) => {
    const article = DebateArticle(req.body);

    article.save((err, article) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, article });
    });
    
    
});


router.post('/add-thesis', auth, (req, res) => {
    const article = DebateThesis(req.body);

    article.save((err, article) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, article });
    });
    
});


router.post('/add-antithesis', auth, (req, res) => {
    const article = DebateAntiThesis(req.body);

    article.save((err, article) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, article });
    });
    
    
});


router.post('/add-synthesis', auth, (req, res) => {
    const article = DebateSynthesis(req.body);

    article.save((err, article) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, article });
    });
    
    
});


/////// list books

router.get('/fetch-debate-article', auth,(req, res) => {

    DebateArticle.find({})
        .populate("writer")
        
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-debate/:id', auth,(req, res) => {

    DebateArticle.findOne({"_id":req.params.id})
        .populate("writer")
        
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-debate-synthesis', auth, (req, res) => {

    DebateSynthesis.find({})
        .populate("writer")
        .populate("debate_article")
        .populate("debate_antithesis")
        .populate("debate_thesis")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

/// approve leaders visions

router.patch('/approve-debate-article/:id', admin, (req, res) => {

    DebateArticle.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-approved-debate', auth, (req, res) => {

    DebateArticle.find({"approved":true})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.patch('/approve-thesis/:id', admin, (req, res) => {

    DebateThesis.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-approved-thesis', auth, (req, res) => {

    DebateThesis.find({"approved":true})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.patch('/approve-antithesis/:id', admin, (req, res) => {

    DebateAntiThesis.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-approved-antitithesis', auth, (req, res) => {

    DebateAntiThesis.find({"approved":true})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.patch('/approve-synthesis/:id', admin, (req, res) => {

    DebateSynthesis.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-approved-synthesis', auth, (req, res) => {

    DebateSynthesis.find({"approved":true})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});


 
//// get trending articles

router.get('/trending/:id', auth, (req, res) => {

    article = DebateArticle();
    
    DebateArticle.findOneAndUpdate({ "_id": req.params.id },{$set:{view_counts:++article.view_counts}})
        
        .exec((err, comment) => {
            if (err) res.status(400).json(err);
            res.status(200).json({ success: true, trending: comment });
        });
    
        console.log(article.view_counts)
});

// db.got.update({"name":"Jon Snow"},{$set:{"name":"Kit Harington"}})
router.get('/trending', auth, (req, res) => {

    DebateArticle.find().sort({view_counts:-1})
   
        .exec((err, trending) => {
            if (err) res.status(400).json(err);
            res.status(200).json({ success: true, trending: trending });
        });
    

 });






module.exports = router;