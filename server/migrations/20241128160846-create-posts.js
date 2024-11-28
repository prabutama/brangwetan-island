'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {  // Pastikan kolom ini ada
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {  // Pastikan kolom ini ada
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Referensi ke model 'users'
          key: 'user_id',
        },
        onDelete: 'CASCADE',  // Jika user dihapus, post terkait juga akan dihapus
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Menghapus tabel 'posts'
    await queryInterface.dropTable('posts');
  }
};
