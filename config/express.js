'use strict';

const express = require('express');
const searchRouter = require('../router/searches.router.js');

const app = express();

app.use(searchRouter);
app.use(express.static('public'));

module.exports = app;