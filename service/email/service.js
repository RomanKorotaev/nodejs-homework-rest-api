import Mailgen from 'mailgen'

class EmailService {
    constructor (env, sender){
        this.sender = sender
        switch(env){
            case 'development':
                this.link = 'https://47c6-212-80-48-14.ngrok.io'
                break
            case 'test':
                this.link = 'http://localhost:3000'
                break
            case 'production':
                this.link = 'https://api-35-lisson11a.herokuapp.com'
                
                break
                default :
                this.link = 'http://localhost:3000'

        }
    }

    createEmailTemplate (username, verifyToken) {
        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Group 35',
                link: this.link
            }
        });

       const  email = {
            body: {
                name: username,
                intro: 'Welcome ! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with our API, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help. :) :) :)'
            }
        };

        return  mailGenerator.generate(email);

    }

    async sendVerifyEmail (email, username, verifyToken) {
        console.log ('sendVerifyEmail = email ', email )
        console.log ('sendVerifyEmail = username', username )
        console.log ('sendVerifyEmail = verifyToken',  verifyToken )

        const emailBody = this.createEmailTemplate ( username, verifyToken)
        const msg = {
            to: email,
            subject: 'Verify email',
            html: emailBody
        }
        
        console.log ('!this.sender = ', this.sender)
        
        try {
            const result = await this.sender.send(msg)
            console.log ('result  = ', result)
            return true
        } catch (error) {
            console.error(error.message)
            console.log ('error = ', error)
            return false
        }
    }
}

export default EmailService