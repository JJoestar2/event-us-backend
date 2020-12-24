const mongoose = require("mongoose");

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    location: String,
    dateCreation: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    }
  })
);

module.exports = Event;