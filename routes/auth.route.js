const express = require("express");

const {
  googleAuth,
  oauth2callback,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.get("/google", googleAuth);

router.get("/send", oauth2callback);

module.exports = router;
