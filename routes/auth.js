const express = require("express");

const router = express.Router();

const { check } = require("express-validator");
const authController = require("../controllers/authController");

//api/auth
router.post(
  "/",
  [
    check("username", "Infome um username valido").isLength({
      min: 1,
    }),
    check("password", "Preencha o campo").isLength({
      min: 1,
    }),
  ],
  authController.authUser
);



module.exports = router;
