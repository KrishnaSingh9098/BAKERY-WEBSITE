import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    // user: console.log('SMTP_USER:', process.env.SMTP_USER), // SMTP username
    // pass: console.log('SMTP_PASS:', process.env.SMTP_PASS)  // SMTP password
    user : '824ff9002@smtp-brevo.com',
   pass : 'HaZU6V9Bs4IqTjO5'
  }
});



export default transporter;
