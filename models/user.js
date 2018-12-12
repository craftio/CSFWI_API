const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let UserSchema = new Schema({
    email: String,
    password: String
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;