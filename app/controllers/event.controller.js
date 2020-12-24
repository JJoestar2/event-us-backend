const mongoose = require("mongoose");
const db = require("../models");
const Event = db.event;
let EventService = require('../services/events.service');    
const { formateDate } = require("../utils/formateDate");

exports.getEvents = async (req, res) => {
    try {
        let events = await EventService.getEvents()
        return res.status(200).json({ status: 200, data: events });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getEventById = async (req, res) => {
    const id = req.params.id;
    try {
        let event = await EventService.getEventById(id);
        return res.status(200).json({ status: 200, data: event });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addEvent = async (req, res) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        dateCreation: formateDate(req.body.dateCreation),
        creator: mongoose.Types.ObjectId(req.body.userId) });
    try {
        await EventService.addEvent(event);
        return res.status(200).json({ status: 200, message: "Successuflly created event" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteEvent = async (req, res) => {
  const id = req.params.id; 
  try {
      await EventService.deleteEvent(id);
      return res.status(200).json({ status: 200, message: "Successuflly deleted event" });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.getUserEvents = async (req, res) => {
  const id = req.body.userId;
  try {
      let userEvents = await EventService.getUserEvents(id);
      return res.status(200).json({ status: 200, data: userEvents });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
  }
}