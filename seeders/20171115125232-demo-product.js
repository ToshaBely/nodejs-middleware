'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('products', [
        {
          title: 'One'
        },
        {
          title: 'Two'
        },
        {
          title: 'Three'
        },
        {
          title: 'Four'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('products', null, {});
  }
};
