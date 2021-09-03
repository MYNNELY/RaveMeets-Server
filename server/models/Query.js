const { Users, Events } = require('../../database/mongoose.js');

module.exports = {
  searchGroupsAndEventsModel: ({ q }, callback) => {
    const regex = new RegExp(q, 'i')
    Users.find({name: {$regex: regex}})
      .then((Users) => {
        Events.find({name: {$regex: regex}})
          .then((Events) => {
            const result = {Events, Users}
            callback(null, result)
          })
          .catch((err) => {
            callback(err, null)
          })
      })
      .catch((err) => {
        callback(err, null)
      })
  }
}