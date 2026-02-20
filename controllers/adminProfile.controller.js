const { hash } = require("bcrypt");
const admin = require("../models/admin.model");

exports.getProfile = async (req, res) => {
  const { adminname } = req.params;
  const [firstName, lastName] = adminname.toLowerCase().split("-");
  try {
    const admin = await admin.findOne({ firstName, lastName });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    return res.status(200).json({ admin });
  } catch (error) {
    console.error("Failed to u get admin profile", error);
    return res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};

exports.updateProfile = async (req, res) => {
  const { adminId } = req.params.id;
  const [firstName, lastName, email, password] = req.body;

  try {
    const admin = await admin.findOne({ adminId });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    const updated = {}
    firstName ? updated.firstName == firstName : ""
    lastName ? updated.lastName == lastName : ""
    email ? updated.email == email : ""
    password ? updated.password == (hash(password, 10)) : ""

    const newAdmin = admin.findOneAndUpdate({ updated }, { new: true })
    return res.status(200).json({ admin });
  } catch (error) {
    console.error("Failed to update admin profile", error);
    return res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};

exports.deleteProfile = async (req, res) => {
  const { adminname } = req.params;
  const [firstName, lastName] = adminname.toLowerCase().split("-");

  try {
    const admin = await admin.findOneAndDelete({ firstName, lastName });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }
    return res.status(200).json({ message: "admin profile deleted successfully" });
  } catch (error) {
    console.error("Failed to delete admin profile", error);
    return res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};
  