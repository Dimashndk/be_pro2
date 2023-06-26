'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.SMALLINT
      },
      username: {
        type: Sequelize.STRING(225),
        unique:true,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING(225),
        unique:true,
        allowNull:false
      },
      phoneNumber: {
        type: Sequelize.STRING(225),
        unique:true,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING(225),
        allowNull:false
      },
      imgProfile: {
        type: Sequelize.STRING(225),
        defaultValue:null
      },
      isVerify: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};