const { Groups, Users, Events } = require('../../database/mongoose.js')

module.exports = {
  getAllGroupsModel: (callback) => {
    Groups.find({}, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  },
  getGroupModel: ({ group_id }, callback) => {
    Groups.find({ _id: group_id}, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  },
  createGroupModel: ({ name, banner_url, event_id, username }, callback) => {
    Users.findOne({ username }, (err, usersResult) => {
      if (err) {
        callback(err, null)
      } else {
        Events.findById(event_id, (err, eventsResult) => {
          if (err) {
            callback(err, null)
          } else {
            Groups.create({
              name,
              banner_url,
              event_details: eventsResult,
              members: [{
                username: username,
                name: usersResult.name,
                role: 'admin',
                profile_pic_url: usersResult.profile_pic_url,
              }]
            }, (err, groupsResult) => {
              if (err) {
                callback(err, null)
              } else {
                Users.updateOne({ username }, {
                  $push: {groups: {
                    group_name: groupsResult.name,
                    group_id: groupsResult._id
                  }}
                }, (err, result) => {
                  if (err) {
                    callback(err, null)
                  } else {
                    callback(null, groupsResult)
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  // addGroupMembersModel: ({ group_id },{ username, role }, callback) => {
  //   Users.findOne({ username }, (err, usersResult) => {
  //     if (err) {
  //       callback(err, null)
  //     } else {
  //       Groups.updateOne({
  //         _id: group_id
  //       }, {
  //         $push: {
  //           members: {
  //             username: username,
  //             name: usersResult.name,
  //             role: role
  //           }
  //         }
  //       }, (err, result) => {
  //         if (err) {
  //           callback(err, null)
  //         } else {
  //           callback(null, result)
  //         }
  //       })
  //     }
  //   })
  // },
  AddGroupPhotosModel: ({ group_id }, { photos }, callback) => {
    Groups.updateOne({
      _id: group_id
    }, {
      $push: {
        group_photos: photos
      }
    }, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    });
  },
  deleteGroupModel: ({ group_id }, callback) => {
    Groups.findByIdAndDelete(group_id, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    })
  },
  addGroupMembersModel: ({ group_id },{ username, role }, callback) => {
    let userData;
    let groupData;
    Users.findOne({ username })
      .then((user) => {
        userData = user
        Groups.findById(group_id)
          .then((group) => {
            groupData = group
            Groups.updateOne({
              _id: group_id
            }, {
              $push: {
                members: {
                  username: username,
                  name: userData.name,
                  role: role,
                  profile_pic_url: userData.profile_pic_url,
                }
              }
            })
            .then(() => {
              Users.updateOne({
                username
              },{
                $push: {
                  groups: {
                    group_name: groupData.name,
                    group_id: groupData._id
                  }
                }
              })
              .then((result) => {
                callback(null, result)
              })
              .catch((err) => {
                callback(err, null)
              })
            })
            .catch((err) => {
              callback(err, null)
            })
          })
          .catch((err) => {
            callback(err, null)
          })
      })
      .catch((err) => {
        callback(err, null)
      })
  },

}