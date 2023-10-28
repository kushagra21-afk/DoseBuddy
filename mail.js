const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({path: "./vars/.env"});
const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

function sendMail(to,subject,text) {
  const mailOptions = {
    from: 'gamerkuah21@gmail.com',
    to,
    subject,
    text,
  };

  transporter.sendMail( mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail;