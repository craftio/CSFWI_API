const db = require('./connections/mongodb');
db.Connect();

let express = require('express');
let server = express();
let bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

server.use(bodyParser.json());

server.get('/', (req, res, next) => {
    res.send("Welcome to the Muzika API");
});

server.get('/api', (req, res, next) => {
    res.send("Welcome to the Muzika API");
});

// Load genre routes
server.use('/api', require('./routes/v1/routes_genres_v1'));
// Load artist routes
server.use('/api', require('./routes/v1/routes_artists_v1'));
// Load song routes
server.use('/api', require('./routes/v1/routes_songs_v1'));

server.listen(port, () => {
    console.log('Server is listening on port ' + port);
});

module.exports = server;