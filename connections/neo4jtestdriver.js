/**
 *  Require this driver ( connections/neo4jdriver_test ) to use the test database.
 */

const neo4j = require('neo4j-driver').v1;

let driver;

const NEO4J_TESTDATABASE_LINK = 'bolt://hobby-johakcgjchmbgbkeaiccmgcl.dbs.graphenedb.com:24786';
const NEO4J_TESTDATABASE_USER = 'test-user';
const NEO4J_TESTDATABASE_PASS = 'b.l86fBLulMvZ8.u6fAg1STVQUv88HJ';

driver = neo4j.driver(NEO4J_TESTDATABASE_LINK,
    neo4j.auth.basic(NEO4J_TESTDATABASE_USER, NEO4J_TESTDATABASE_PASS));

module.exports = driver;
