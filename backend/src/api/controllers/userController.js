import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    req.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, newName } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { name: newName }
    );
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
