const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const EmailSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Vui lòng nhập email của bạn!"],
      minlength: [10, "Email phải có ít nhất 10 ký tự"],
      maxlength: [100, "Email không được dài quá 100 ký tự"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) =>
          `${props.value} không phải là một địa chỉ email hợp lệ!`,
      }, //kiểm tra chuỗi có phải là một địa chỉ email không
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
        },
        message: 'Email phải là một địa chỉ Gmail hợp lệ có đuôi "@gmail.com"',
      },
      unique: true, //đảm bảo email là duy nhất
      lowercase: true, //đảm bảo được chuyển thành chữ thường
      trim: true, //loại bỏ khoảng trắng
    },
  },
  {
    timestamps: true,
  }
);

// Áp dụng plugin uniqueValidator và cài đặt thông báo lỗi tiếng Việt
EmailSchema.plugin(uniqueValidator, {
  message:
    "Địa chỉ {PATH} `{VALUE}` đã được sử dụng. Vui lòng chọn một địa chỉ khác!",
});

const Email = mongoose.model("Email", EmailSchema);

module.exports = Email;
