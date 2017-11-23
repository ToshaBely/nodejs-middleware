const fs = require('fs');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const User = require('../models/user')(sequelize, Sequelize);
const Product = require('../models/product')(sequelize, Sequelize);
const Review = require('../models/review')(sequelize, Sequelize);

Review.belongsTo(Product);
Product.hasMany(Review);

module.exports = {
    getAllProducts: () => Product.findAll({ include: [ Review ] }),
    getSingleProduct: (id) => Product.findById(id, { include: [ Review ] }),
    getAllProductReviews: (id) => Review.findAll({ where: { productId: id } }),
    addProduct: (product) => Product.create(product, { include: [Review] }),
    getAllUsers: () => User.findAll(),
    getUserById: (id) => User.findById(id),
    getUserByLogin: (login) => User.findOne({ where: {login} }),
    getUserByAuthStrategy: (authStrategy, authId) => User.findOne({ where: { authStrategy, authId} }),
    createUserByAuthStrategy: (authStrategy, authId, username) => User.create({authStrategy, authId, username}),

    getRandomCity: () => new Promise(res => res({message: 'This method for mongo-controller'})),
    getAllCities: () => new Promise(res => res({message: 'This method for mongo-controller'})),
    addCity: (city) => new Promise(res => res({message: 'This method for mongo-controller'})),
    updateOrCreateCity: (id, city) => new Promise(res => res({message: 'This method for mongo-controller'})),
    deleteCity: (id) => new Promise(res => res({message: 'This method for mongo-controller'})),
    deleteUser: (id) => new Promise(res => res({message: 'This method for mongo-controller'})),
    deleteProduct: (id) => new Promise(res => res({message: 'This method for mongo-controller'})),
};
