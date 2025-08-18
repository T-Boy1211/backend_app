const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = reequire('bcrypt');

exports.signup = () => {
  const { username, email, password } = req.body;
  try {
    const userExists = User.findOne({ email });
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*₤฿₩₹€£]).{8,}$/;
    if (!passwordRegex.test(password))
      return res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
    if (userExists)
      return res.status(409).json({ message: "User already exists" });
    const hashedPassword = bcrypt.hash( password, 10 )
    const newUser = { username, email, password: hashedPassword };
    const token = jwt.sign()
      .then(() => User.save(newUser))
      .then(() => {
        return "Signup successful", token
      });
  } catch (error) {
    console.error("Failed to sign user", error);
    return res.status(500).json({ message: "Wait for troubleshoot", error });
  }
};

exports.login = () => {
  const { email, password } = req.body;
  try {
    const userExists = User.findOne({ email });
    const isMatch = bcrypt.compare({ hashedPassword: password });
    if (!isMatch) {
      res.status(401).json({ message: 'Email or password incorrect' });
    }
    if (userExists) {
      res.status(200).json({ message: 'Login succcesful, you can proceed' });
    }
  } catch (error) {
    console.log("Login failed");
    res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};
