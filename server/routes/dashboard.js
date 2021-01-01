const express = require('express');
const Dashboard = require('../models/dashboard');
const router = express.Router();




router.post('/dashboard', (req, res) => {
   Dashboard.find({"onlineUser": req.body.onlineUser}).exec((err, doc) => {
        if (err) return res.status(400).send(err);

        
        
        res.status(200).json({ success: true, doc });
  })
   

});



module.exports = router;