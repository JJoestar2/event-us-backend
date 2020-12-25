const db = require("../models");
const User = db.user;

exports.updateUser = async (id, user) => {
    try {
        await User.findByIdAndUpdate(id, user, {new: true});
	    const updatedUser = await User.findById(id);
        return updatedUser;
    } catch (e) {
        throw Error('Cannot update user' + e);
    }
}