'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('reviews', [
        {
          title: 'One_test',
          mark: 1,
          productId: 1
        },
        {
          title: 'Two_test',
          mark: 2,
          productId: 1
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('reviews', null, {});
  }
};
