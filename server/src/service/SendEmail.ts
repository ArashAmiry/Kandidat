import * as nodeMailer from 'nodemailer';
import EMAIL_PASSWORD from './email_password';
import { AccessCode } from './accessCode';
export class SendEmail {

    accessCodeService = new AccessCode()
    async sendReviewEmail(emails: string[], reviewID: string) {
        emails.forEach(async email => {
            const code = this.accessCodeService.generateIndividualAccessCode(reviewID);
            const html = `
                <h1> Hello World </h1>
                <a href="localhost:3000/answer/${reviewID}">Go to the review</a>
                <p>Here is your accesscode: ${code}</a>
                `;
            const transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com', // kanske fixa
                port: 465,
                secure: true,
                auth: {
                    user: 'noreply.reviewtool@gmail.com', // fixa
                    pass: EMAIL_PASSWORD // fixa 
                }
            });

            const info = await transporter.sendMail({
                from: 'ReviewTool <noreply.reviewtool@gmail.com>',
                to: email,
                subject: 'You have a review to do',
                html: html
            })

            console.log("Message sent: " + info.messageId);
        });


    }


    /*
    Skicka en 
    */
    async sendAuthenticationEmail(email: string, activationLink: string) {
        const html = `
        <h1> Hello World </h1>
        <p>Click the following link to activate your account:</p>
        <a href="${activationLink}">Activate Account</a>
    `;
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com', // kanske fixa
            port: 465,
            secure: true,
            auth: {
                user: 'noreply.reviewtool@gmail.com',
                pass: EMAIL_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: 'ReviewTool <noreply.reviewtool@gmail.com>',
            to: 'anton.boras1@gmail.com',
            subject: 'Account activation',
            html: html
        })

        console.log("Message sent: " + info.messageId);

    }


}