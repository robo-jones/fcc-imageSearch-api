'use strict';

const router = require('express').Router();
const searches = require('../controllers/searches.controller.js');

router.get('/api/search', searches.makeSearch);
router.get('/api/search/recent', searches.getSavedSearches);

module.exports = router;