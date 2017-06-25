'use strict';

const mongodb = require('../config/mongodb.js');

const SAVED_SEARCHES_COLLECTION = 'savedSearches';

const insert = async function(searchQuery, timeMade) {
    const document = {
        query: searchQuery,
        time: timeMade
    };
    const db = await mongodb.connect();
    const savedSearches = await db.collection(SAVED_SEARCHES_COLLECTION);
    const result = await savedSearches.insert(document);
    db.close();
    return { result, document };
};

const retrieve = async function(number = 10, start = 0) {
    const db = await mongodb.connect();
    const savedSearches = await db.collection(SAVED_SEARCHES_COLLECTION);
    const result = await savedSearches.find().limit(number).skip(start).sort({ time: -1 }).toArray();
    db.close();
    return result;
};

module.exports = {
    insert,
    retrieve
};