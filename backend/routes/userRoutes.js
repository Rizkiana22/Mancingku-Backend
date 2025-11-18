const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//ambil user berdasarkan id
router.get("/:id", userController.getUser);

//update user profil
router.put("/:id", userController.updateUser);

//export router agar bisa dipakai di index.js
module.exports = router;
