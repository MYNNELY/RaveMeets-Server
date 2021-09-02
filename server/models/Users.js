const { Users } = require('../../database/mongoose.js')
const bcrypt = require('bcryptjs');

module.exports = {
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
}