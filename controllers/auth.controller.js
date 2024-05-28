// const express = require("express");
// const { google } = require("googleapis");

// const oauth2Client = new google.auth.OAuth2(
//   "1065840918733-vkim54t42rqhc7t7rorp0b0hvdbps5f5.apps.googleusercontent.com",
//   "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",
//   "http://localhost:3000/api/auth/oauth2callback"
// );

// const googleAuth = (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/gmail.send"],
//   });

//   res.redirect(url);
// };

// const oauth2callback = async (req, res) => {
//   const { code } = req.query;
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
//   //lưu tokens vào session
//   // req.session.accessToken = tokens.access_token;
//   // req.session.refreshToken = tokens.refresh_token;
//   // req.session.expiryDate = tokens.expiry_date;

//   res.send("Xác thực thành công, bạn có thể thoát trang!!!");
// };

// module.exports = oauth2Client;

// module.exports = {
//   googleAuth,
//   oauth2callback,
// };
