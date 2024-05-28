const { json } = require("express");
const User = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      message: "success!!!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const getAllUsers = await User.find({});

    res.status(200).json({
      data: getAllUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (email, refreshToken) => {
  try {
    const update = await User.updateOne(
      { email },
      { refreshToken },
      { upsert: true }
    );
  } catch (error) {
    return JSON.stringify({
      message: error.message,
    });
  }
};

// const getOneUser = async (email) => {
//   try {
//     const user = await User.find({ email: email });
//     console.log(user.data);
//     return user;
//   } catch (error) {
//     console.error("Error getting refresh token:", error);
//     return null;
//   }
// };

const getOneUser = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.find({ email: email });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting refresh token:", error);
    res.status(500).hjson({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  getOneUser,
};
