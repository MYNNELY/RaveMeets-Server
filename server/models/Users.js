const { Users } = require('../../database/mongoose.js')

module.exports = {
  getUserModel: ({ username }, callback) => {
    Users.find({ username }, (err, doc) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, doc)
      }
    });
  },
  createUserModel: ({ username, name, email, password }, callback) => {
    Users.create({ username, name, email, password }, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res)
      }
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