const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();
const Checkout = require('../models/Checkout');




router.post('/cartNum', (req, res) => {
    Cart.find({ "onlineUser": req.body.onlineUser }).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        
        res.status(200).json({ success: true, cartNum: doc.length });
  })
   

});


router.post('/saveCart', (req, res) => {
    const cart = Cart(req.body);
    cart.save((err, doc) => {
        if (err) return res.status(400).send(err);
        
        res.status(200).json({ success: true, cart: doc });
  })
   

});


router.post('/removeBook', (req, res) => {
    Cart.findOneAndDelete({ "_id": req.body.bookId}, {"onlineUser" : req.body.onlineUser})
    .exec((err, doc) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({ success: true, msg:"book deleted" });

    });
   

});

router.get('/cartBooks', (req, res) => {
    Cart.find({})
        .populate('books')
        .exec((err, doc) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({ success: true, cart: doc });

        });
   

});




module.exports = router;