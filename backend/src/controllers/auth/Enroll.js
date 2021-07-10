const path = require('path');
const User = require('../../models/user');
const TokenService = require('../../services/Token');
const EmailService = require('../../services/Email');
const ForbiddenError = require('../../errors/forbidden-error');
const ejs = require('ejs');

class EnrollAccountController {
    constructor(body) {
        this.email = body.username;
        this.token = body.token;
        this.displayName = body.displayName;
        this.password = body.password;
    }

    result() {
        return new Promise(async (resolve) => {
            if (!this.token && User.isSuperAdmin(this.email)) {
                await this.sendMail();

                resolve();
            } else if (this.token && this.displayName && this.password) {
                const { email } = TokenService.verify(this.token);
                const existUser = await User.findOne({ where: { email }});

                if (!existUser) {
                    await User.create({ email, displayName: this.displayName, password: this.password });
                }

                resolve({ email });
            } else {
                throw new ForbiddenError();
            }
        });
    }

    sendMail() {
        return new Promise(async (resolve) => {
            const template = await this.#getTemplate();

            const email = new EmailService({
                from: 'Hr database',
                to: this.email,
                subject: 'Вы были приглашены в Hr database',
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

module.exports = EnrollAccountController