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

module.exports.getAllProducts = () => Product.findAll({ include: [ Review ] });

module.exports.getSingleProduct = (id) => Product.findById(id, { include: [ Review ] });

module.exports.getAllProductReviews = (id) => Review.findAll({ where: { productId: id } });

module.exports.addProduct = (product) => Product.create(product, { include: [Review] });

module.exports.getAllUsers = () => User.findAll({ raw: true });

module.exports.getUserById = (id) => User.findById(id);

module.exports.getUserByLogin = (login) => User.findOne({ where: {login} });

module.exports.getUserByAuthStrategy = (authStrategy, authId) => User.findOne({ where: { authStrategy, authId} });

module.exports.createUserByAuthStrategy = (authStrategy, authId, username) => User.create({authStrategy, authId, username});
