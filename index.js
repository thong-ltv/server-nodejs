const express = require("express");
const path = require("path");

// Using Node.js `require()`
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const postRoute = require("./routes/post.route.js");
const emailRoute = require("./routes/email.route.js");
const userRoute = require("./routes/user.route.js");
const session = require("./session/session.js");

// dùng limiter để giới hạn lại số lần mà client có thể gởi mail
const limiter = require("./limits/limit.js");

const app = express();

const cors = require("cors");

// Cung cấp các tệp tĩnh trong thư mục 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//middleware
app.use(express.json()); //de hieu du lieu dau vao la json
app.use(express.urlencoded({ extended: true }));
// Cho phép tất cả các origin
app.use(cors());

//session setup
// app.use(session);

//routes
app.use("/api/products", productRoute);
app.use("/api/post", postRoute);
app.use("/api/email", emailRoute);
app.use("/api/user", userRoute);

const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
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

app.post("/api/mail/sendMail", (req, res) => {});

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
