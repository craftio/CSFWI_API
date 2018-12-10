const db = require('./connections/mongodb');
db.Connect();

let express = require('express');
let server = express();
let bodyParser = require('body-parser');
let cors = require('cors');
const port = process.env.PORT || 3000;

const ANGULAR_LINK = process.env.ALLOW_ORIGIN || 'http://localhost:4200';


server.use(bodyParser.json());

server.use(cors());

//CORS headers
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', ANGULAR_LINK);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.status(200);
        res.end();
    } else {
        next();
    }

    //next();
});

server.get('/api', (req, res, next) => {
    res.send("Welcome to the Muzika API, every route starts with /api, example: /api/genres");
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