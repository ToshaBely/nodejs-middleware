const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const mongoConnect = require('util').promisify(MongoClient.connect);

const schema = require('../mongoose-schema');

const url = 'mongodb://localhost:27017/testdb';

mongoose.connect(url);
mongoose.connection.once('open', () => console.log('connection via mongoose is opened'));

const City = mongoose.model('cities', schema.city);
const User = mongoose.model('user', schema.user);
const Product = mongoose.model('product', schema.product);

// Uncomment next two line for seed database
// User.create(require('../models/mongo-seeds').users);
// Product.create(require('../models/mongo-seeds').products);

module.exports = {
    getAllProducts: () => Product.find(),
    getSingleProduct: (id) => Product.findById(id),
    getAllProductReviews: (id) => Product.findById(id).then(product => product.reviews),
    addProduct: (product) => Product.create(product),
    deleteProduct: (_id) => Product.remove({_id}),

    getAllUsers: () => User.find(),
    getUserById: (id) => User.findById(id),
    getUserByLogin: (login) => User.findOne({login}),
    getUserByAuthStrategy: (authStrategy, authId) => User.findOne( {authStrategy, authId} ),
    createUserByAuthStrategy: (authStrategy, authId, username) => User.create({authStrategy, authId, username}),
    deleteUser: (_id) => User.remove({_id}),

    // test function with mongoDB driver
    getRandomCityDeprecated: () => mongoConnect(url).then(db => {
        return db.collection('cities').find({}).toArray()
                .then(arr => arr[Math.floor(Math.random() * arr.length)])
                .catch(err => db.close());
    }),
    
    getRandomCity: () => City.find().then(cities => cities[Math.floor(Math.random() * cities.length)]),
    getAllCities: () => City.find(),
    addCity: (city) => City.create(city),
    updateOrCreateCity: (_id, city) => City.update({_id}, city, {upsert: true}),
    deleteCity: (_id) => City.remove({_id})
};
