const mongoose = require('mongoose');                       // Required library for actions using mongo connection.
const mongodb = require('../connections/mongotestdb');      // Connection scripts.
const neo4jdb = require('../connections/neo4jtestdriver');  // Connection scripts.

before((done) => {
    mongodb.Connect(done);
});

beforeEach((done) => {
    const { songs, artists, genres } = mongoose.connection.collections;
    songs.drop(() => {
        artists.drop(() => {
            genres.drop(() => {
                let session = neo4jdb.session();
                session.run('MATCH (n) DETACH DELETE n')
                    .then(() => {
                        session.close();
                        done();
                    });
            });
        });
    });
});