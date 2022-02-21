'use strict';
const jsons = require('../../test.json');
console.log(jsons[1]);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', jsons);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {});
  },
};
