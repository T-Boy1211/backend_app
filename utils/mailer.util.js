const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 265,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, template, userData) => {
  try {
    const templatePath = path.join(__dirname, `../views/${template}.ejs`);
    const html = await ejs.renderFile(templatePath, userData);

    const mailOptions = {
      from: `'  SWAGSTER' <${process.env.EMAIL_USER}>`,
      to,
      subject: "SWAGSTER Notification",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

module.exports = sendEmail;
