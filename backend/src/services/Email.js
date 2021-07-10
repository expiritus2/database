const nodemailer = require('nodemailer');

const defaultTransportConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
    },
}

class Email {
    constructor(emailConfig, transportConfig = defaultTransportConfig) {
        this.emailConfig = emailConfig;
        this.transportConfig = transportConfig;
        this.transporter = nodemailer.createTransport(this.transportConfig);
    }

    send() {
        return new Promise(async (resolve) => {
            if (this.transporter) {
                const info = await this.transporter.sendMail(this.emailConfig);

                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            resolve();
        });
    }
}

module.exports = Email;