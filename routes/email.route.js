const express = require("express");

const {
  deleteEmail,
  getEmails,
  deleteAllEmai,
} = require("../controllers/email.controller");

const router = express.Router();

// router.post("/", createEmail);

router.get("/", getEmails);

router.delete("/:id", deleteEmail);

router.delete("/", deleteAllEmai);

module.exports = router;
