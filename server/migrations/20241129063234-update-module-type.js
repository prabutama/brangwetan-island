'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        'modules',
        'type',
        {
          type: Sequelize.ENUM('image', 'video'), // ENUM baru tanpa 'text'
          allowNull: false,
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        'modules',
        'type',
        {
          type: Sequelize.ENUM('text', 'image', 'video'), // ENUM lama dengan 'text'
          allowNull: false,
        },
        { transaction }
      );
    });
  }
};
