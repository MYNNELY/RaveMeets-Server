const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ravemeets')
  .then(() => {
    console.log('database connected successfully')
  })
  .catch((err) => {
    console.log('error when connecting to database', err);
  })

const friendsSchema = new mongoose.Schema({
  friend_name: String,
  friend_username: String
});

const musicSchema = new mongoose.Schema({
  genre_name: String,
});

const artistSchema = new mongoose.Schema({
  artist_name: String,
});

const eventMemoriesPhotosSchema = new mongoose.Schema({
  url: String,
  caption: String,
});

const eventsMemoriesSchema = new mongoose.Schema({
  event_memory_description: String,
  event_memory_location: String,
  event_memory_photos: [eventMemoriesPhotosSchema]
});

const usersGroupsSchema = new mongoose.Schema({
  group_name: String,
  group_id: String
});

const venuesSchema = new mongoose.Schema({
  name: String,
  address: String
});

const groupMemberShema = new mongoose.Schema({
  username: String,
  name: String,
  role: String
})

const eventsSchema = new mongoose.Schema({
  name: String,
  link: String,
  start_date: Date,
  end_date: Date,
  event_banner_url: String,
  price: Number,
  minimum_age: Number,
  genres: [musicSchema],
  artist_list: [artistSchema],
  venue: venuesSchema
});

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
  },
  name: String,
  email: String,
  password: String,
  address: String,
  profile_pic_url: String,
  bio: String,
  music_taste: [musicSchema],
  artist_taste: [artistSchema],
  friends: [friendsSchema],
  events_memories: [eventsMemoriesSchema],
  events_upcoming: [eventsSchema],
  events_attended: [eventsSchema],
  groups: [usersGroupsSchema]
});

const groupsSchema = new mongoose.Schema({
  name: String,
  banner_url: String,
  event_details: eventsSchema,
  members: [groupMemberShema],
  group_photos: [eventMemoriesPhotosSchema]
})


const Users = mongoose.model('Users', usersSchema);

const Events = mongoose.model('Events', eventsSchema);

const Groups = mongoose.model('Groups', groupsSchema);

module.exports = {
  Users,
  Events,
  Groups,
};