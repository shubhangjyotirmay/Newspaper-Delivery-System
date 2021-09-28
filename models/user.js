const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;