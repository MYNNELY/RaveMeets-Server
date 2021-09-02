const { getAllEventsModel, createEventModel } = require('../models/Events.js');

module.exports = {
  getAllEvents: (request, response) => {
    getAllEventsModel((err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.send(result);
      }
    });
  },
  createEvent: (request, response) => {
    createEventModel(request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.send(result);
      }
    });
  }
}

