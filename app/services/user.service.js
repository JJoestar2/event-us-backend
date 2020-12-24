const db = require("../models");
const User = db.user;

exports.updateUser = async (id, user) => {
    try {
        const res = User.findByIdAndUpdate(id, user, {new: true});
        return res;
    } catch (e) {
        throw Error('Cannot update user' + e);
    }
}