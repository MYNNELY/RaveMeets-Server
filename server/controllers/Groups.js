const { createGroupModel, addGroupMembersModel, AddGroupPhotosModel } = require('../models/Groups.js');

module.exports = {
  createGroup: (request, response) => {
    createGroupModel(request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.send(result);
      }
    });
  },
  addGroupMembers: (request, response) => {
    addGroupMembersModel(request.params, request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    });
  },
  AddGroupPhotos: (request, response) => {
    AddGroupPhotosModel(request.params, request.body, (err, result) => {
      if (err) {
        response.status(500).send();
      } else {
        response.status(201).send();
      }
    })
  }
}