'use strict';

const app = require('express')();
const searchRouter = require('../router/searches.router.js');

app.use(searchRouter);

module.exports = app;