'use strict';

//Required config variables
[
    'NODE_ENV',
    'PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'DB_PORT',
    'DB',
    'GCS_API_KEY',
    'GCS_CX'
].forEach((configVar) => {
    if (!process.env[configVar]) {
        throw new Error(`Error: Required environment variable \'${configVar}\' is missing!`);
    }
});

const config = {
    env: process.env.NODE_ENV,
    server: {
        port: Number(process.env.PORT)
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dbName: process.env.DB
    },
    googleCustomSearch: {
        apiKey: process.env.GCS_API_KEY,
        url: 'https://www.googleapis.com/customsearch/v1',
        cx: process.env.GCS_CX
    }
};

module.exports = config;