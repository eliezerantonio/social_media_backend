const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
  //revisar erros
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extraur email e senha

  const { email, password } = req.body;

  try {
    //revisar se e um usuari o registrado

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Usuario nao existe" });
    }

    // revisar senha de
    const correctPass = await bcryptjs.compare(password, user.password);

    if (!correctPass) {
      return res.status(400).json({ msg: "Senha incorreta" });
    }

    //buscar usuario salvado e escondendo a sua senha
    const userSaved = await User.findById(user.id).select("-password");
    //formar o token
    const payload = { user: { id: user.id } };

    jwt.sign(
      payload,
      process.env.SECRET,
      {/* Token never expire */ },
      (error, token) => {
        if (error) throw error;

        //return token caso der sucesso al
        res.json({ token: token, user: userSaved });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

