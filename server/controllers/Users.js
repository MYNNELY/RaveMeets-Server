const { loginModel, eventAttendingModel, eventAttendedModel, addFriendModel, getUserModel, createUserModel, updateUserModel, createEventMemoriesModel } = require('../models/Users.js');

module.exports = {
  login: (request, response) => {
    loginModel(request.body, (err, result) => {
      if (err) {
        response.status(403).send();
      } else {
        response.send(result);
      }
    });
  },
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
  },
  addFriend: (request, response) => {
    addFriendModel(request.params, request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    })
  },
  eventAttending: (request, response) => {
    eventAttendingModel(request.params, request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    })
  },
  eventAttended: (request, response) => {
    eventAttendedModel(request.params, request.body, (err, result) => {
      if (err) {
        console.log(err);
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    })
  }
}