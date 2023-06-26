import nodemailer from 'nodemailer'


const sendEmail = async ({
    to = '',
    message = '',
    subject = '',
    attachments = []
}) => {
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 587,
        secure: false,
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })
    const info = await transporter.sendMail({
        from: process.env.USER,
        to,
        subject,
        html: message,
        attachments
    })
    if (info.accepted.length) {
        return true
    }
    return false
}

export default sendEmail