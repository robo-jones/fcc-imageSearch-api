'use strict';

const savedSearches = require('../models/savedSearches.js');
const googleCustomSearch = require('../models/googleCustomSearchApi.js');

const makeSearch = async function(req, res) {
    const query = req.query.q;
    const numResults = req.query.num || 10;
    const start = req.query.start || 1;
    const timeMade = Date.now();
    
    if (!query) {
        res.json({
            Error: 'Must specify a search query (see api documentation for details)'
        });
    } else {
        try {
            let results = await googleCustomSearch.makeSearch(query, numResults, start);
            await savedSearches.insert(query, timeMade);
            res.json(results);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};

const getSavedSearches = async function(req, res) {
    const start = req.query.start || 0;
    const numResults = req.query.num || 10;
    
    try {
        const results = await savedSearches.retrieve(numResults, start);
        res.json(results.map((result) => (
            {
                searchQuery: result.query,
                timeMade: new Date(result.time).toUTCString()
            }
        )));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

module.exports = {
    makeSearch,
    getSavedSearches
};