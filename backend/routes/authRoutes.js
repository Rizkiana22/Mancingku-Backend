const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

//route register user baru
router.post("/register", authController.register);

//route lgoin user
router.post("/login", authController.login);

//export route agar bisa dipakai di index.js
module.exports = router;
