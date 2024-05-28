const Email = require("../models/email.model.js");
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");

// const oauth2Client = require("./auth.controller");

// const oauth2Client = new google.auth.OAuth2(
//   "1068467981990-hdt6qi3j9pni53he9jpvvtacoaluufjv.apps.googleusercontent.com",
//   "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",
//   "http://localhost:3000/api/auth/oauth2callback"
// );

// const googleAuth = (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: ["https://www.googleapis.com/auth/gmail.send"],
//   });
//   console.log(url);
//   res.redirect(url);
// };

// const oauth2callback = async (req, res) => {
//   console.log("da vao oauth2callback");
//   const { code } = req.query;
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
//   //lưu tokens vào session
//   // req.session.accessToken = tokens.access_token;
//   // req.session.refreshToken = tokens.refresh_token;
//   // req.session.expiryDate = tokens.expiry_date;

//   res.send("Xác thực thành công, bạn có thể thoát trang!!!");
// };

// const createEmail = async (req, res) => {
//   try {
//     // const email = await Email.create(req.body);

//     function makeBody(to, from, subject, message) {
//       const str = [
//         'Content-Type: text/plain; charset="UTF-8"\n',
//         "MIME-Version: 1.0\n",
//         "Content-Transfer-Encoding: 7bit\n",
//         "to: ",
//         to,
//         "\n",
//         "from: ",
//         from,
//         "\n",
//         "subject: ",
//         subject,
//         "\n\n",
//         message,
//       ].join("");

//       const encodedMail = Buffer.from(str)
//         .toString("base64")
//         .replace(/\+/g, "-")
//         .replace(/\//g, "_")
//         .replace(/=+$/, "");

//       return { raw: encodedMail };
//     }

//     async function sendEmail(auth, to, from, subject, message) {
//       const gmail = google.gmail({ version: "v1", auth });
//       const email = makeBody(to, from, subject, message);

//       try {
//         const response = await gmail.users.messages.send({
//           userId: "me",
//           requestBody: email,
//         });
//         console.log("Email sent: ", response.data);
//         console.log(auth);
//       } catch (error) {
//         console.error("Failed to send email: ", error);
//       }
//     }

//     const recipients = ["thonghoaixuan@gmail.com", "thongltv.nina@gmail.com"]; // Danh sách email người nhận
//     const from = "thonglaptrinhvien@gmail.com";
//     const subject = "Hello from Node.js!";
//     const message =
//       "This is a test email sent via Gmail API with OAuth2 authentication.";

//     recipients.forEach((recipient) => {
//       sendEmail(oauth2Client, recipient, from, subject, message);
//     });

//     res.status(200).json({
//       message: "success",
//     });
//   } catch (error) {
//     if (error.errors.email.kind == "unique") {
//       return res.status(500).json({
//         message:
//           "Địa chỉ email đã tồn tại. Vui lòng nhập địa chỉ email khác!!!",
//       });
//     }

//     if (error.errors.email.kind == "required") {
//       return res.status(500).json({
//         message: "Vui lòng nhập địa chỉ email vào!!!",
//       });
//     }

//     if (error.errors.email.kind == "user defined") {
//       return res.status(500).json({
//         message: "Địa chỉ email không hợp lệ!!!",
//       });
//     }

//     if (error.errors.email.kind == "minlength") {
//       return res.status(500).json({
//         message:
//           "Email phải có ít nhất 10 kí tự. Vui lòng nhập lại email khác!!!!!!",
//       });
//     }

//     if (error.errors.email.kind == "maxlength") {
//       return res.status(500).json({
//         message:
//           "Email không được dài quá 100 kí tự. Vui lòng nhập lại email khác!!!!!!",
//       });
//     }
//   }
// };

const getEmails = async (req, res) => {
  try {
    const emails = await Email.find({});
    res.status(200).json({
      data: emails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a email
const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const email = await Email.findByIdAndDelete(id);

    if (!email) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.status(500).json({ message: "Email delete successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete all email
const deleteAllEmai = async (req, res) => {
  try {
    await Email.deleteMany({});

    res.status(500).json({
      message: "Successly delete all mails!!!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  // createEmail,
  getEmails,
  deleteEmail,
  deleteAllEmai,
};
