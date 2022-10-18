//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const serveIndex = require('serve-index')
const logger = require('./config/logger');
const config = require('./init_config');
const pjson = require('./package.json');
const routes = require('./src/routes/routes');
const conn = require('./src/connection/get-connect');
const app = express();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// graphql 
const graphql = require("graphql");
const expressGraphQl = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./src/graphql/queries");
const schema = new GraphQLSchema({query});
app.use('/api/graphql', expressGraphQl({ schema: schema, graphiql: true }));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/appinfo/logs', express.static(`${__dirname}/logs`), serveIndex(`${__dirname}/logs`, { 'icons': true }))
app.use('/', routes);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Логирование запуска текущей версии
logger.info(`GraphQL_Service: Version: ${pjson.version}`);
logger.info(`GraphQL_Service: Start configuration: ${JSON.stringify(config)}`);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(config.SYSTEM.restConfig.dinsService.port, async () => {

    logger.info(`GraphQL_Service: server started. Port: ${config.SYSTEM.restConfig.dinsService.port}`);

    client = await conn.getConnect();

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////