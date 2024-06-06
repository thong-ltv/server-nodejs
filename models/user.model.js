const mongoose = require("mongoose");
const { PassThrough } = require("nodemailer/lib/xoauth2");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
  },

  password: {
    type: String,
  },

  role: {
    type: String,
  },

  created_at: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
