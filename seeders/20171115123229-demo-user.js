'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [{ 
        username: 'Anton Bely',
        login: 'abely',
        password: 'test1'
      }, {
        username: 'John Doe',
        login: 'jdoe',
        password: 'test2'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
