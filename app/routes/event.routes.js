const { checkEvent, authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const baseUrl = "/api/event";

  app.get(`${baseUrl}/all`, [authJwt.verifyToken], controller.getEvents);

  app.post(`${baseUrl}/user-events`, controller.getUserEvents);

  app.get(`${baseUrl}/:id`, [authJwt.verifyToken], controller.getEventById);

  app.post(`${baseUrl}/add`, controller.addEvent);

  app.delete(`${baseUrl}/:id`, [authJwt.verifyToken], controller.deleteEvent);

};