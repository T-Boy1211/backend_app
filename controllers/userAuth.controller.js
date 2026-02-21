const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sendEmail = require("../utils/mailer.util");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*₤฿₩₹€£]).{8,}$/;
    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const user = { username, email, password: hashedPassword, role: "user" };
    const token = jwt.sign(
      { userId: user._id, mail: email, role: role },
      process.env.JWT_SECRET,
    );
    sendEmail({ email, template: "userSignup", userData: { username } });
    return res.status(200).json({ message: "successfullu signup", token });
  } catch (error) {
    console.error("Failed to sign user", error);
    return res.status(500).json({ message: "Wait for troubleshoot", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    const isMatch = bcrypt.compare({ hashedPassword: password });
    if (!userExists) {
      res.status(200).json({ message: "Login failed" });
    }
    if (!isMatch) {
      res.status(401).json({ message: "Email or password incorrect" });
    }
    const token = jwt.sign(
      { userId: userExists._id, mail: userExists.email, role: userExists.role },
      process.env.JWT_SECRET,
    );
    sendEmail({ email, template: "userLogin", userData: { username } });
    return res.status(200).json({ message: "Login succcesful, you can proceed", token });
  } catch (error) {
    console.log("Login failed");
    res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};
