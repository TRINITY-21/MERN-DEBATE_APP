const router = require('express').Router();
const { auth } = require('../../middleware/auth');
const { admin } = require('../../middleware/admin');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const Article = require('../../models/Articles/articles');
const ArticleComment = require('../../models/Articles/article_comment');




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


////// ADD AN ARTICLE

router.post('/add-article', auth, (req, res) => {
    const article = Article(req.body);

    article.save((err, article) => { 
        if (err) res.status(400).json({ success: false, err });

        res.status(200).json({ success: true, article });
    });
    
    
});


/////// list books

router.get('/fetch-articles', auth,(req, res) => {

    Article.find({})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-articles/:id', auth, (req, res) => {

    Article.findOne({"_id":req.params.id})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

/// approve leaders visions

router.patch('/approve-article/:id', admin, (req, res) => {

    Article.findOneAndUpdate({"_id":req.params.id},req.body)
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

router.get('/fetch-approved-article', auth, (req, res) => {

    Article.find({"approved":true})
        .populate("writer")
        .exec((err, article) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, article: article })
        })
     
});

//// Article comment
router.post('/add-comment',auth, (req, res) => {
    comment = ArticleComment(req.body);

    comment.save((err, comment) => {
        if (err) res.status(400).json(err);
        

        ArticleComment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, result) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true, result })
        })

    });
});

router.get("/getComments", auth,(req, res) => {

    ArticleComment.find({ "commentId": req.body.articleId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});



router.get('/comments/:id',auth, (req, res) => {
    ArticleComment.findById({_id:req.params.id})
    .populate("writer")
    .populate('article')
    .exec((err, comment) => {
        if (err) res.status(400).json(err);
        res.status(200).json({ success: true, comment: comment });

    });
});
 
//// get trending articles

router.get('/trending/:id', auth, (req, res) => {

    article = Article();
    
    Article.findOneAndUpdate({ "_id": req.params.id },{$set:{view_counts:++article.view_counts}})
        
        .exec((err, comment) => {
            if (err) res.status(400).json(err);
            res.status(200).json({ success: true, trending: comment });
        });
    
        console.log(article.view_counts)
});

// db.got.update({"name":"Jon Snow"},{$set:{"name":"Kit Harington"}})
router.get('/trending', auth, (req, res) => {

    Article.find().sort({view_counts:-1})
   
        .exec((err, trending) => {
            if (err) res.status(400).json(err);
            res.status(200).json({ success: true, trending: trending });
        });
    

 });






module.exports = router;