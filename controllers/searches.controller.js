'use strict';

const savedSearches = require('../models/savedSearches.js');
const googleCustomSearch = require('../models/googleCustomSearchApi.js');

const makeSearch = async function(req, res) {
    const query = req.query.q;
    const numResults = req.query.num || 10;
    const start = req.query.offset || 1;
    const timeMade = Date.now();
    
    if (!query) {
        res.json({
            Error: 'Must specify a search query (?q=<query>)'
        });
    } else if (numResults > 10 || numResults < 1) {
        res.json({
            Error: 'Please specify a number of results between 1 and 10'
        });
    } else if (start < 1) {
        res.json({
            Error: 'offset must be > 0'
        });
    } else {
        try {
            let results = await googleCustomSearch.makeSearch(query, numResults, start);
            await savedSearches.insert(query, timeMade);
            res.json(results.items.map((item) => ({
                url: item.link,
                altText: item.snippet,
                thumbnailUrl: item.image.thumbnailLink,
                context: item.image.contextLink
            })
            ));
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
};

const getSavedSearches = async function(req, res) {
    const start = Number(req.query.start) || 0;
    const numResults = Number(req.query.num) || 10;
    
    if (start < 0) {
        res.json({
            Error: 'start must be >= 0'
        });
    } else if (numResults < 1) {
        res.json({
            Error: 'num must be > 0'
        });
    } else {
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
    }
};

module.exports = {
    makeSearch,
    getSavedSearches
};