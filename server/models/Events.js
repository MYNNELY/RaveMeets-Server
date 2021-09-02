const { Events } = require('../../database/mongoose.js')

module.exports = {
  getAllEventsModel: (callback) => {
    Events.find({}, (err, docs) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, docs)
      }
    });
  },
  createEventModel: ({
    name,
    link,
    start_date,
    end_date,
    event_banner_url,
    price,
    minimum_age,
    genres,
    artist_list,
    venue
  }, callback) => {
    Events.create({
      name,
      link,
      start_date,
      end_date,
      event_banner_url,
      price,
      minimum_age,
      genres,
      artist_list,
      venue
    }, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res)
      }
    });
  },
}