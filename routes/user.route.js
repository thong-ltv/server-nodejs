const express = require("express");

const {
  createUser,
  getAllUser,
  updateUser,
  getOneUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/", createUser);

router.get("/", getAllUser);

// router.put("/", (req, res) => {
//   try {
//     updateUser("thonglaptrinhvien111@gmail.com", "fjghjfgjggjgjgjffffff");

//     res.status(200).json("success");
//   } catch (error) {}
// });

// router.get("/getOne", (req, res) => {
//   try {
//     const user = getOneUser("thonglaptrinhvien111@gmail.com");
//     console.log(user);
//     res.status(200).json({
//       data: user,
//     });
//   } catch (error) {}
// });

router.get("/getOne/:email", getOneUser);

module.exports = router;
