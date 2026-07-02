import nodemailer from "nodemailer";
import env from "../config/env.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (email, username, token) => {
    const verificationLink = `${env.CLIENT_URL}/verify/${token}`;

    const mailOptions = {
        from: `"DevPulse" <${env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your DevPulse Account",
        html: `
            <h2>Welcome to DevPulse 🚀</h2>

            <p>Hello <b>${username}</b>,</p>

            <p>Thank you for registering with DevPulse.</p>

            <p>Please click the button below to verify your email address.</p>

            <a href="${verificationLink}"
               style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
               ">
               Verify Email
            </a>

            <p>If the button doesn't work, copy this link:</p>

            <p>${verificationLink}</p>

            <br>

            <p>This link will expire in 1 hour.</p>

            <p>Team DevPulse</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

export default transporter;