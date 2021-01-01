const express = require('express');
const router = express.Router();
const { Likes } = require("../models/Likes");

const { auth } = require("../middleware/auth");

//=================================
//             Likes DisLikes
//=================================


router.post('/likeNum', (req, res) => {
    Likes.find({'bookId': req.body.bookId}).exec((err, like) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, likeNum: like.length });
    });
});


router.post('/like', (req, res) => {
    const like =  Likes(req.body);
    like.save((err, like) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, like });

    });
    
});

router.post('/unlike', (req, res) => {
    Likes.findOneAndDelete({ "onlineUser": req.body.onlineUser }, { "bookId": req.body.bookId })
        .exec((err, like) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, msg: "Unliked" });
        });

});
    


module.exports = router;
