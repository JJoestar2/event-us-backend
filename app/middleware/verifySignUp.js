const db = require('../models');
const User = db.user;

const CheckDuplicateEmail = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec((err, user) => {   
            if(err) {
                req.status(500).send({message: err});
                return;
            }
        
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
    });
}

const vefifySignUp = {
    CheckDuplicateEmail
};

module.exports = vefifySignUp;