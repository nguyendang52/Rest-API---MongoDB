const validator = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    age: {
        type: Number,
        min: 6,
        max: 12,
        default: 0,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
    },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
