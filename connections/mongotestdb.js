const mongoose = require('mongoose');

module.exports = class MongoTestDB {
    static Connect(done) {
        mongoose.Promise = global.Promise;

        const DATABASE_USER = 'administrative-user';
        const DATABASE_PASS = 'mongodb-csfwi';
        const DATABASE_NAME = 'test';                   // <-- Only difference from other mongodb file

        const CONNECTION_STRING = 'mongodb+srv://' + DATABASE_USER + ':' + DATABASE_PASS + '@cluster-csfwi-l2eo8.mongodb.net/' + DATABASE_NAME + '?retryWrites=true';

        mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true});
        mongoose.connection
            .once('open', () => {
                console.log('Good to go!');
                done();
            })
            .on('error', (error) => {
                console.warn('Warning', error);
            });
    }
};