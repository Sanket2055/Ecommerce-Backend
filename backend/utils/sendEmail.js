const nodeMailer = require('nodemailer');
const sendEmail = async (options) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }

    });

    const mailOptions = {
        from: process.env.SNTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
     
    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail;