'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    authStrategy: DataTypes.STRING,
    authId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};