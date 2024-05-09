const express = require("express");

// Using Node.js `require()`
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const postRoute = require("./routes/post.route.js");
const emailRoute = require("./routes/email.route.js");
const session = require("./session/session.js");
const authRoute = require("./routes/auth.route.js");

// dùng limiter để giới hạn lại số lần mà client có thể gởi mail
const limiter = require("./limits/limit.js");

const app = express();

const cors = require("cors");

//middleware
app.use(express.json()); //de hieu du lieu dau vao la json
app.use(express.urlencoded({ extended: true }));
// Cho phép tất cả các origin
app.use(cors());

//session setup
app.use(session);

//routes
app.use("/api/products", productRoute);
app.use("/api/post", postRoute);
app.use("/api/email", emailRoute);
//roputer này dùng để xác thực
// app.use("/api/auth", authRoute);
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  "1065840918733-vkim54t42rqhc7t7rorp0b0hvdbps5f5.apps.googleusercontent.com",
  "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",
  "http://localhost:3000/api/auth/send"
);

app.get("/api/auth/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });
  res.redirect(url);
});

app.get("/api/auth/send", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send("Authentication successful! You can now close this page."); // Hoặc chuyển hướng người dùng đến trang khác
  } catch (error) {
    res.status(500).send("Authentication failed.");
  }
});

app.post("/api/mail/sendMail", (req, res) => {
  const { google } = require("googleapis");

  function makeBody(to, from, subject, message) {
    const str = [
      'Content-Type: text/plain; charset="UTF-8"\n',
      "MIME-Version: 1.0\n",
      "Content-Transfer-Encoding: 7bit\n",
      "to: ",
      to,
      "\n",
      "from: ",
      from,
      "\n",
      "subject: ",
      subject,
      "\n\n",
      message,
    ].join("");

    const encodedMail = Buffer.from(str)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return { raw: encodedMail };
  }

  async function sendEmail(auth, to, from, subject, message) {
    const gmail = google.gmail({ version: "v1", auth });
    const email = makeBody(to, from, subject, message);

    try {
      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: email,
      });
      console.log("Email sent: ", response.data);
      console.log(auth);
    } catch (error) {
      console.error("Failed to send email: ", error);
    }
  }

  const recipients = ["thonghoaixuan@gmail.com", "thongltv.nina@gmail.com"]; // Danh sách email người nhận
  const from = "thonglaptrinhvien@gmail.com";
  const subject = "Hello from Node.js!";
  const message =
    "This is a test email sent via Gmail API with OAuth2 authentication.";

  recipients.forEach((recipient) => {
    sendEmail(oauth2Client, recipient, from, subject, message);
  });
});

app.post("/api/email", limiter);

//connect mongo (Node Api là tên của cơ sở dữ liệu dùng trong database)
mongoose
  .connect(
    "mongodb+srv://thonglaptrinhvien:tJEye3yw6ATaCE*@cluster0.zhntbql.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server runing on port 3000");
    });
  })
  .catch(() => {
    console.log("connection failed!");
  });
