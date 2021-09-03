const { searchGroupsAndEventsModel } = require('../models/Query.js');

module.exports = {
  searchGroupsAndEvents: (request, response) => {
    searchGroupsAndEventsModel(request.query, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.send(result);
      }
    });
  }
}