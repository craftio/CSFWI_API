const User = require('../models/user');
const NorU = require('../globalfunctions/noru');
const jsonModel = require('../models/jsonResponseModel');
const TOKEN_KEY = require('../connections/token');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

module.exports = class AuthRepo {
    static registerUser(email, pass, res) {
        User.findOne({ email: email })
            .then((user) => {
                if (!NorU(user)) {
                    const hashedPass = bcrypt.hashSync(pass, 10);
                    const newUser = new User({
                        email: email,
                        password: hashedPass
                    });
                    newUser.save()
                        .then(() => {
                            res.status(200).json(new jsonModel('/register', 'POST', 200, 'Successfully created user.', newUser));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel('/register', 'POST', 500, 'Failed to save user to database', newUser));
                        })
                } else {
                    res.status(412).json(new jsonModel('/register', 'POST', 412, 'There is already a user registered with that email address.', null));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/register', 'POST', 500, 'The request could not be handled.', null));
            });
    }

    static loginUser(email, pass, res) {
        User.findOne({ email: email })
            .then((user) => {
                if (NorU(user)) {
                    if (user.comparePassword(pass)) {
                        res.status(200).json({token: jwt.sign({ email: user.email, password: user.password }, TOKEN_KEY)});
                    } else {
                        res.status(401).json(new jsonModel('/login', 'POST', 401, 'Authentication failed, wrong password.', null));
                    }
                } else {
                    res.status(500).json(new jsonModel('/login', 'POST', 404, 'The user email could not be found.', null));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel('/login', 'POST', 500, 'The request could not be handled.', null));
            })
    }
};