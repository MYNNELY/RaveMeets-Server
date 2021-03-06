const express = require('express');
const router = require('./routes');
const cors = require('cors');
const app = express();
require('dotenv').config()

app.use(cors())
app.use(express.json());
app.use('/', router);

app.listen(3000)

module.exports.app = app;