const { Users, Events } = require('../../database/mongoose.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = {
  loginModel: ({ username, password }, callback) => {
    Users.findOne({ username })
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((result) => {
            if (result) {
              jwt.sign({
                id: user._id,
                username: user.username
              }, process.env.JWT_SECRET, (err, token) => {
                if (err) {
                  callback(err, null)
                } else {
                  callback(null, token)
                }
              });
            } else {
              callback(true, null)
            }
          })
          .catch((err) => {
            callback(err, null)
          })
      })
      .catch((err) => {
        callback(err, null)
      })
  },
  getUserModel: ({ username }, callback) => {
    Users.find({ username })
      .select('-password')
      .then((result) => {
        callback(null, result)
      })
      .catch((err) => {
        callback(err, null)
      })
  },
  createUserModel: ({ username, name, email, password }, callback) => {
    bcrypt.hash(password, 10)
      .then((hashedPassword) => {
        Users.create({ username, name, email, password: hashedPassword }, (err, res) => {
          if (err) {
            callback(err, null)
          } else {
            callback(null, res)
          }
        });
      })
      .catch((err) => {
        callback(err, null)
      });
  },
  updateUserModel: (
    {
      username
    },
    {
      name,
      profile_pic_url,
      bio,
      music_taste,
      artist_taste
    },
    callback) => {
    Users.updateOne(
      {
        username
      },
      {
        name,
        profile_pic_url,
        bio,
        music_taste,
        artist_taste
      }, (err, res) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, res)
        }
      });
  },
  createEventMemoriesModel: ({ username }, { description, location, photos}, callback) => {
    Users.updateOne({ username }, {
      events_memories: {
        event_memory_description: description,
        event_memory_location: location,
        event_memory_photos: photos
      }
    }, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res)
      }
    });
  },
  addFriendModel: ({ username }, { friend_username }, callback) => {
    let friendData;
    let userData;

    Users.findOne({ username })
      .then((User) => {
        userData = User;
        Users.findOne({ username: friend_username })
          .then((Friend) => {
            friendData = Friend;
            Users.updateOne({ username }, {
              $push: {
                friends: {
                  friend_name: friendData.name,
                  friend_username: friendData.username
                }
              }
            })
            .then(() => {
              Users.updateOne({ username: friend_username}, {
                $push: {
                  friends: {
                    friend_name: userData.name,
                    friend_username: userData.username
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
          })
          .catch((err) => {
            callback(err, null)
          })
      })
      .catch((err) => {
        callback(err, null)
      })
  },
  eventAttendingModel: ({ username }, { event_id }, callback) => {
    Events.findById(event_id)
      .then((event) => {
        Users.updateOne({ username }, {
          $push: {
            events_upcoming: event
          }
        })
        .then((result) => {
          callback(null, result);
        })
        .catch((err) => {
          callback(err, null)
        })
      })
      .catch((err) => {
        callback(err, null)
      });
  },
  eventAttendedModel: ({ username }, { event_id }, callback) => {
    Events.findById(event_id)
      .then((event) => {
        Users.updateOne({ username }, {
          $push: {
            events_attended: event
          }
        })
        .then((result) => {
          Users.findOne({ username })
            .then((result) => {
              result.events_upcoming.id(event_id).remove()
              result.save()
                .then((result) => {
                  callback(null, result)
                })
                .catch((err) => {
                  callback(err, null)
                })
            })
        })
        .catch((err) => {
          callback(err, null)
        })
      })
      .catch((err) => {
        callback(err, null)
      });
  },
}