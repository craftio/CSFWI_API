const db = require('./connections/mongodb');
db.Connect();

let express = require('express');
let server = express();
let bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

server.use(bodyParser.json());

server.get('/api', (req, res, next) => {
    res.send("Welcome to the Muzika API, to make use of the routes add /api to the end of the url in the address bar. Example: /api/genres");
});

// Load genre routes
server.use('/api', require('./routes/v1/routes_genres_v1'));
// Load artist routes
server.use('/api', require('./routes/v1/routes_artists_v1'));
// Load song routes
server.use('/api', require('./routes/v1/routes_songs_v1'));

// Fix unused pages
server.get('*', (req, res, next) => {
    res.redirect('/api');
});

server.listen(port, () => {
    console.log('Server is listening on port ' + port);
});

module.exports = server;