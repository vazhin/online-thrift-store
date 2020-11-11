'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Product }) {
      this.hasMany(Product, { foreignKey: 'userId', as: 'products' });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Username must not be empty' },
        },
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: 'Must be a valid email address' },
          notEmpty: { msg: 'Email must not be empty' },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password must not be empty' },
        },
      },
      image: DataTypes.TEXT,
      userId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
