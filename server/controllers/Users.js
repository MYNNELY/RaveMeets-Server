const { getUserModel, createUserModel, updateUserModel, createEventMemoriesModel } = require('../models/Users.js');

module.exports = {
  getUser: (request, response) => {
    getUserModel(request.params, (err, result) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.send(result);
      }
    });
  },
  createUser: (request, response) => {
    createUserModel(request.body, (err, result) => {
      if (err) {
        if (err.code === 11000) {
          response.status(500).send('user already exits');
        } else {
          response.status(500).send();
        }
      } else {
        response.status(201).send();
      }
    });
  },
  updateUser: (request, response) => {
    updateUserModel(request.params, request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    });
  },
  createEventMemories: (request, response) => {
    createEventMemoriesModel(request.params, request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    });
  }
}