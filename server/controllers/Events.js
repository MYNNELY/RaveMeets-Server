const { getEventModels, getAllEventsModel, createEventModel } = require('../models/Events.js');

module.exports = {
  getEvent: (request, response) => {
    getEventModels(request.params, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.send(result);
      }
    });
  },
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

