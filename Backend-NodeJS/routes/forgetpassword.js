const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// routes/forgetpassword.js
router.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;

    User.findOne({ resetToken: token }).then(user => {
        if (!user) {
            return res.status(400).json({ status: 'failed', data: 'Invalid or expired token' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(400).json({ status: 'failed', data: 'Invalid or expired token' });
            }

            user.password = newPassword; // You might want to hash this before saving
            user.resetToken = undefined; // Clear the reset token
            user.save().then(() => {
                res.json({ status: 'success', data: 'Password has been reset successfully' });
            }).catch(err => {
                res.status(500).json({ status: 'failed', data: err });
            });
        });
    }).catch(err => {
        res.status(500).json({ status: 'failed', data: err });
    });
});


module.exports = router;
