/**
 *  Require this driver ( connections/neo4jdriver ) to use the regular database.
 */

const neo4j = require('neo4j-driver').v1;

let driver;

const NEO4J_DATABASE_LINK = 'bolt://hobby-bbhakcgjchmbgbkepfidmgcl.dbs.graphenedb.com:24786';
const NEO4J_DATABASE_USER = 'administrative-user';
const NEO4J_DATABASE_PASS = 'b.ulWpEwlA4ZTZ.hjWZWg9k41eVbcN8';

driver = neo4j.driver(NEO4J_DATABASE_LINK,
    neo4j.auth.basic(NEO4J_DATABASE_USER, NEO4J_DATABASE_PASS));

module.exports = driver;
