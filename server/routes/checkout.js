const express = require('express');
const Book = require('../models/Book');
const router = express.Router();
const Checkout = require('../models/Checkout');




router.post('/checkout', (req, res) => {
    const checkout = Checkout(req.body);

    checkout.save((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        
        res.status(200).json({ success: true, doc });
    });

   

});



router.post('/book', (req, res) => {
    Checkout.find({})
    .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });

        // let checkouts = [];

        // doc.map((checkoutId,i) => {
        //     checkouts.push(checkoutId.books);
        // });
        
        res.status(200).json({ success: true, doc });
    });

   

});










module.exports = router;