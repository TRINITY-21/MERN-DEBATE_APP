const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');

const AboutUs = require('../../models/AboutUs/AboutUs');


router.post('/about', (req, res) => {

    const about = new AboutUs(req.body);

    var transporter = nodemailer.createTransport({
            
        host: 'smtp.gmail.com',
        auth: {
            user: 'agyemanjoseph12@gmail.com',
            pass: '000'
        }
    });
    
        const htmlEmail = `
            <h3>Contact deatails </h3>
            <ul>

                <li>Name: ${about.name} </li>
                <li>Subject: ${about.subject} </li>
                <li>Email: ${about.email} </li>
            </ul>
            <h3> Message <h3>
            <p>${about.message}</p>

        `
        var mailOptions = {
            from: 'test@gmail.com',
            to: 'agyemanjoseph12@gmail.com',
            subject: 'Sending Email using Node.js',
            text: req.body.content,
            html: htmlEmail
            };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error:', err);
                res.status(500).send({status: 'FAIL', msg: 'Internal error: email not sent'})
            } else {
                console.log('Message sent: %s', info.content);
                console.log('Message URL: %s', nodemailer.getTestMessageUrl);
                res.status(200).json({status: 'OK', msg: 'Email sent'})
            }
        });
    })




module.exports = router;