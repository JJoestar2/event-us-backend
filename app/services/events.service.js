const mongoose = require("mongoose");
const db = require("../models");
const Event = db.event;

exports.getEvents = async () => {
    try {
        let events = await Event.find()
        .lean()
        .populate("creator", { _id:1, username: 1, surname: 1 });
        return events;
    } catch (e) {
        throw Error('Error while getting Events' + e)
    }
}

exports.getEventById = async (id) => {
    try {
        let event = await Event.findById(id)
        .lean()
        .populate("creator", { _id:1, username: 1, surname: 1 });
        return event;
    } catch(e) {
        throw Error('Error while getting event' + e );
    }
}

exports.addEvent = async (event) => {
   await event.save((err) => {
        if (err) {
            throw Error('Error while saving event' + e);
        }
    });
}

exports.deleteEvent = async (id) => {
   try {
    await Event.findOneAndDelete(id);
   } catch(e) {
        throw Error("Could not delete Event with id=" + id);
   }
}

exports.getUserEvents = async (userId) => {
  try {
      let userEvents = await Event.aggregate([ { $match : { creator : mongoose.Types.ObjectId(userId) }},
                    { $lookup : { from: 'users', localField: 'creator', foreignField: '_id', as: 'user' }},
                    { $unwind: "$user" },
                    { $project: { 
                      "title": 1,
                      "description": 1,
                      "location": 1,
                      "dateCreation": 1,
                       "user" : {
                        "_id" : 1,
                        "username" : 1,
                        "surname" : 1} }} ]);
        return userEvents;
    } catch(e) {
        throw Error("Error while getting user events" + e);
    }
}