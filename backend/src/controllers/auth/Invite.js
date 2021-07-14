const path = require('path');
const User = require('../../models/user');
const TokenService = require('../../services/Token');
const EmailService = require('../../services/Email');
const ejs = require('ejs');

class Invite {
    constructor(body, user) {
        this.email = body.email;
        this.user = user;
    }

    sendMail() {
        return new Promise(async (resolve) => {
            const template = await this.#getTemplate();

            const userName = this.user && this.user.displayName ? `${this.user.displayName} пригласил вас` : 'Вы были приглашены';

            const email = new EmailService({
                from: 'Hr database',
                to: this.email,
                subject: `${userName} в Hr database`,
                html: template,
            });

            await email.send();
            resolve();
        });
    }

    #createLink() {
        const token = TokenService.sign({ email: this.email });
        return `${process.env.FRONTEND_DOMAIN}/#/enroll-account?token=${token}`;
    }

    #getTemplate(filename = 'invite.ejs') {
        return new Promise(async (resolve) => {
            const templatePath = path.resolve(__dirname, '..', '..', 'templates', filename);
            const template = await ejs.renderFile(templatePath, { link: this.#createLink() });
            resolve(template);
        })
    }
}

module.exports = Invite