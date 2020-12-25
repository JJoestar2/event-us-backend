const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (user) => {
      await user.save((err) => {
        if (err) {
          throw Error('Cannot register user' + e);
        }
    });
};

exports.signin = async (req) => {

  let user =  await User.findOne({email: req.body.email});

  if (!user) {
        throw Error ("User Not found.");
    }

  let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );
        
    if (!passwordIsValid) {
        let result = {
            accessToken: null,
            message: "Invalid Password!"
        };
        return result;
    }
        
   let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours 
    });
   let result = {
        _id: user._id,
        username: user.username,
        surname: user.surname,
        city: user.city,
        phone: user.phone,
        dateBirth: user.dateBirth,
        email: user.email,
        accessToken: token 
    };

    return result; 
};