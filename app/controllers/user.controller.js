const mongoose = require("mongoose");
const db = require("../models");
const User = db.user;
let UserService = require('../services/user.service');    
const { formateDate } = require("../utils/formateDate");


exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const user = {
        username: req.body.username,
        surname: req.body.surname,
        city: req.body.city,
        phone: req.body.phone,
        dateBirth: formateDate(req.body.dateBirth),
        email: req.body.email
    }
    try {
        await UserService.updateUser(id, user);
        return res.status(200).json({ status: 200, message: "Successuflly updated user!" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


/*exports.updatePassword = async (req, res) => {
    const id = req.params.id;
    try {
        await UserService.updateUser(id, res.body);
        return res.status(200).json({ status: 200, message: "Successuflly updated user password!" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}*/