'use strict';

const config = require('./config/config.js');
const app = require('./config/express.js');

app.listen(config.server.port);
console.log(`Server running on port ${config.server.port}`);