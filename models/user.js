'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      this.hasMany(Product, { foreignKey: 'userId' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
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
