const express = require('express');
const nodemailer = require('nodemailer');
const emailConfig = require('../config/mail.config');

function emailCtrl() {
    const router = express.Router();

    router.post('', async (req, res) => {
        try {
            console.log(emailConfig);
            const transporter = nodemailer.createTransport(emailConfig);

            // Availables options are
            // from - to - cc - bcc - subject - text- html - attachments
            const mailOptions = req.body;

            await transporter.sendMail(mailOptions);

            res.status(200).send('Email is sent successfully !');
        } catch(e) {
            console.log('Sending email fail : ', e.message);
            res.status(500).send('Sending email fail : ' + e.message);
        }
    });

    return router;
}

module.exports = emailCtrl;