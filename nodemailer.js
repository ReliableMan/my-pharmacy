const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'apteka.elbrus@bk.ru',
    pass: 'VzdxDVZ2AcDvVHrpuru4',
  },
}, {
  from: 'Mailer Test <apteka.elbrus@bk.ru>',
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  });
};

module.exports = mailer;
