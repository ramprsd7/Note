const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4000;
// require('../models/db')
const { mongoose } = require('./models/db');
var noteRoute = require('./router/noterouter.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4201' }));

app.listen(port, () => console.log('Server listening on : ' + port));

app.use('/notes', noteRoute);