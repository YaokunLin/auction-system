
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME || 'cs6400_sp24_team036',
    password: process.env.DB_PASSWORD || 'pwd',
    port: process.env.DB_PORT || '5432',
});

module.exports = pool;
