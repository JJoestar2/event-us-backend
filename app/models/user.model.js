const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    surname: String,
    city: String,
    phone: String,
    dateBirth: String,
    email: String,
    password: String
  })
);

module.exports = User;