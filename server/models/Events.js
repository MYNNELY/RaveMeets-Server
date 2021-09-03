const { Events } = require('../../database/mongoose.js')

module.exports = {
  getEventModels: ({ event_id }, callback) => {
    Events.find({_id: event_id}, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    });
  },
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
  deleteEventModel: ({ event_id }, callback) => {
    Events.findByIdAndDelete(event_id, (err, result) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, result)
      }
    });
  },
  updateEventModel: ({ event_id },{
    name,
    link,
    description,
    start_date,
    end_date,
    event_banner_url,
    price,
    minimum_age,
    genres,
    artist_list,
    venue
  }, callback) => {
    Events.updateOne({_id: event_id},{
      name,
      link,
      description,
      start_date,
      end_date,
      event_banner_url,
      price,
      minimum_age,
      venue
    }, (err, res) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, res)
      }
    });
}