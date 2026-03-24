const express = require('express');
const app = express();

app.use(express.json());

const { router } = require('./routes/citas');
app.use('/citas', router);

module.exports = app;