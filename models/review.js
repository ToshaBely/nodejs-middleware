'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('review', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    mark: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    } 
  });
  return Review;
};