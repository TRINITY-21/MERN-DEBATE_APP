const express = require('express');
const router = express.Router();
const Review  = require("../models/Reviews");
const { auth } = require("../middleware/auth");

//=================================
//             Comments
//=================================

router.post("/saveReview", auth, (req, res) => {
    const review = Review(req.body);

    review.save((err, review) => {
        if (err) return res.status(400).json({ success: false, err });

        Review.find({ bookId: req.body.bookId }).populate("onlineUser").exec((err, review) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, review });
        });
        

    });

});

router.get("/getReview", auth,(req, res) => {
    Review.find({onlineUser:req.body.onlineUser}).exec((err, review) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, review });
    });


});



module.exports = router;
