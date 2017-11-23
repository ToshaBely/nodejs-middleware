const Schema = require('mongoose').Schema;

const city = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    capital: {
        type: Boolean,
        required: true
    },
    location: {
        x: Number,
        y: Number
    },
    lastModifiedDate: Date
});

city.pre('update', function(next) {
    this.update({}, { $set: {lastModifiedDate: new Date() }});
    next();
});

city.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    login: String,
    password: String,
    authStrategy: String,
    authId: String,
    lastModifiedDate: Date
});

user.pre('update', function(next) {
    this.update({}, { $set: {lastModifiedDate: new Date() }});
    next();
});

user.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

const product = new Schema({
    title: {
        type: String,
        required: true
    },
    reviews: Array,
    lastModifiedDate: Date
});

product.pre('update', function(next) {
    this.update({}, { $set: {lastModifiedDate: new Date() }});
    next();
});

product.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

module.exports = {
    city,
    user,
    product
};