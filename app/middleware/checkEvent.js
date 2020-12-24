const db = require('../models');
const Event = db.event;

const CheckIfEventExisits = (req, res, next) => {
    Event.find({title: req.body.title})
        .exec((err, event) => {
            if(err) {
                req.status(500).send({message: err});
                return;
            }
        
            if (event) {
                res.status(400).send({ message: "Such event is already exists!" });
                return;
            }

            next();
    })
}

const checkEvent = {
    CheckIfEventExisits
};

module.exports = checkEvent;