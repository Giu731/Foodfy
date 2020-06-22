const nodemailer = require('nodemailer')

module.exports =  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fc1b34dcd609e8",
        pass: "ec6c447463c017"
    }
})