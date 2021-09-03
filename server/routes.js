const router = require('express').Router();
const { login, getUser, createUser, updateUser, createEventMemories } = require('./controllers/Users.js');
const { updateEvent, deleteEvent, getEvent, getAllEvents, createEvent } = require('./controllers/Events.js');
const { deleteGroup, getAllGroups, getGroup, createGroup, addGroupMembers, AddGroupPhotos } = require('./controllers/Groups.js')



//Users
router.post('/login', login)

router.get('/u/:username', getUser);

router.post('/u', createUser);

router.put('/u/:username', updateUser);

router.post('/u/:username/memories', createEventMemories);

//Events

router.get('/events', getAllEvents);

router.get('/events/:event_id', getEvent);

router.post('/events', createEvent);

router.put('/events/:event_id', updateEvent);

router.delete('/events/:event_id', deleteEvent);

//Groups

// router.get('/groups', getAllGroups);

router.delete('/groups/:group_id', deleteGroup);

router.get('/groups/:group_id', getGroup);

router.post('/groups', createGroup);

router.post('/groups/:group_id/members', addGroupMembers);

router.post('/groups/:group_id/photos', AddGroupPhotos);

module.exports = router;