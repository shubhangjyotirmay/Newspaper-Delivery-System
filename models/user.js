const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Enter Name"
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
        type: String,
        default: "Enter Address"
    },
    contactNo: {
        type: String,
        default: "0000000000"
    },
    newspapers: {
        type: Array,
        default: []
    },
    magazines: {
        type: Array,
        default: []
    },
    onlineSubscription: {
        type: Boolean,
        default: false
    },
    billDues: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;