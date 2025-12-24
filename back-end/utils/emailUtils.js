const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // SMTP kullanıcı adı
        pass: process.env.EMAIL_PASS, // SMTP şifresi
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Gönderen e-posta adresi
      to, // Alıcı e-posta adresi
      subject, // E-posta konusu
      text, // E-posta içeriği
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Email could not be sent.');
  }
};

module.exports = { sendEmail };
