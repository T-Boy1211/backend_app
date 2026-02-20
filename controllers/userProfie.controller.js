const User = require("../models/user.model");

exports.getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Failed to u get user profile", error);
    return res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};

exports.updateProfile = async (req, res) => {
  const { username } = req.params;
  const { email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Failed to update user profile", error);
    return res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};

exports.deleteProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user profile", error);
    return res.status(500).json({ message: "Wait for troubleshooting", error });
  }
};
