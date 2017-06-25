'use strict';

const searchApiConfig = require('../config/config.js').googleCustomSearch;
const https = require('https');

function makeSearch(searchQuery, numResults = 10, startIndex = 1) {
    const queryUrl = `${searchApiConfig.url}?q=${searchQuery}&num=${numResults}&start=${startIndex}&cx=${searchApiConfig.cx}&key=${searchApiConfig.apiKey}&searchType=image`;
    
    return getJson(queryUrl);
};

const getJson = function(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const { statusCode } = res;
            
            if (statusCode !== 200) {
                const error = new Error(`Request failed, status code: ${statusCode}`);
                res.resume(); //consume response data to free up memory
                reject(error);
            }
            
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk});
            res.on('end', () => {
                const parsedData = JSON.parse(rawData);
                resolve(parsedData);
            });
        });
    });
};

module.exports = { makeSearch };