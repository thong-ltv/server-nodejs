const sessionExpress = require("express-session");

const session = sessionExpress({
  secret: "123456",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

module.exports = session;
