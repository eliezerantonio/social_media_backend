//rotas para criar usuarios
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
//criar usuarios

router.post("/signup",[
    check("name", "Nome e obrigatorio").not().isEmpty(),
    check("email", "Infome email valido").isEmail(),
    check("password", "Senha deve ser no minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

router.patch("/:id", auth, userController.updateUser);



module.exports = router;
