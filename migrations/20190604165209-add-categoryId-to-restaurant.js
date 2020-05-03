'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Restaurants', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })
 },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Restaurants', 'CategoryId')
 }
}
