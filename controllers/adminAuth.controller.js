const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/mailer.util");

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ email });
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*₤฿₩₹€£]).{8,}$/;
    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });
    if (adminExists) {
      return res.status(409).json({ message: "admin already exists" });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const newAdmin = { firstName, lastName, email, password: hashedPassword, role: 'admin' };
    const token = jwt
      .sign()
      .then(() => Admin.save(newAdmin))
      .then(() => {
        return "Signup successful", newAdmin, token;
      });
      sendEmail({ email, template: 'adminSignup', adminData: { firstName, lastName } })
  } catch (error) {
    console.error("Failed to sign admin", error);
    return res.status(500).json({ message: "Wait for troubleshoot", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminExists = await Admin.findOne({ email });
    const isMatch = bcrypt.compare({ hashedPassword: password });
    if (adminExists) {
      res.status(200).json({ message: "Login succcesful, you can proceed" });
    }
    if (!isMatch) {
      res.status(401).json({ message: "Email or password incorrect" });
    }
    sendEmail({ email, template: 'adminLogin', adminData: { firstName, lastName } })
  } catch (error) {
    console.log("Login failed");
    res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};
