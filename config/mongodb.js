'use strict';

const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./config.js').db;

const dbUrl = `mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`;

const connect = function() {
    return MongoClient.connect(dbUrl);
};

module.exports = { connect };