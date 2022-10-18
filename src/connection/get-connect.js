const { Pool } = require('pg');
const logger = require('../../config/logger');
const config = require('../../init_config');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const pool = new Pool({
    port: config.SYSTEM.dbConnections.emdppDb.port,
    database: config.SYSTEM.dbConnections.emdppDb.database,
    user: config.SYSTEM.dbConnections.emdppDb.user,
    password: config.SYSTEM.dbConnections.emdppDb.password,
    max: config.SYSTEM.dbConfig.max,
    idleTimeoutMillis: config.SYSTEM.dbConfig.idleTimeoutMillis,
    connectionTimeoutMillis: config.SYSTEM.dbConfig.connectionTimeoutMillis,
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function getConnect() {
    let client = null;
    for (let host of config.SYSTEM.dbConnections.emdppDb.hosts) {
        pool.options.host = host;
        try {
            client = await pool.connect()
            logger.info(`GraphQL_Service: connected to DB ${pool.options.host}:${pool.options.port}`);
            break;
        } catch (e) {
            logger.info(`GraphQL_Service: can't connected to ${pool.options.host}:${pool.options.port}`);
            continue;
        }
    }

    if (!client) {
        logger.error(`GraphQL_Service: can't connect to any DB hosts. Stop working!`);
        process.exit(1);
    }

    return client;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    getConnect
}