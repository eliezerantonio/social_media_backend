const User = require("../models/User");

const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { cloudinary } = require('../providers/CloudinaryService');

const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //revisar error

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //extrair email e password

  const {  password, email, name,phone } = req.body;

  try {
    //verificar se o email ja existe antes se cadastrar

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // criar a new user

    //hashear  a senha

    const user = new User({
       email, password, name,phone
    });

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    //guardar usuario

    await user.save();

    //ciriar formar o javascriptWithScope

    const payload = {
      user: { id: user.id },
    };

    //buscar usuario salvado e escondendo a sua senha
    const userSaved = await User.findById(user.id).select("-password");
    //formar o token

    jwt.sign(
      payload,
      process.env.SECRET,
      {},
      (error, token) => {
        if (error) throw error;

        res.json({ token: token, user: userSaved });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(400).send("Houve um erro");
  }
};

exports.updateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let pic = "";
  const { id } = req.params;
  const { name, } = req.body;

 

  try {


    let userExists  = await User.findById(id);

    if (!userExists) {
      return res.status(404).json({ message: "User doesn't exists" });
    }

    if (req.files) {
      const file = req.files.pic;
  
      
    }
    const newPost = {
      name, phone, pic
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: newPost },
      { new: true }
    );

    res.json({ user });

  } catch (error) {
    
    res.status(500).send("Error: "+error);
  }
};

