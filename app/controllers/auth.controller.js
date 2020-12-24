const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.user;
let AuthService = require('../services/auth.service'); 
const { formateDate } = require("../utils/formateDate");


exports.signup = async (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        surname: req.body.surname,
        city: req.body.city,
        phone: req.body.phone,
        dateBirth: formateDate(req.body.dateBirth),
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      });

    try {
        await AuthService.signup(user);
        return res.status(200).send({  message: "User registered successfully!" });
    } catch (e) {
        return res.status(400).send({  message: e.message });
    }
};

exports.signin = async (req, res) => {
  try {
      let result = await AuthService.signin(req);
      if(result.accessToken) return res.status(200).send(result);
      else return res.status(400).send(result); 
  } catch (e) {
      return res.status(400).send({ message: e.message });
  }
};