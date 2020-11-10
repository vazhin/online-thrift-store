'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      currency: DataTypes.TEXT,
      phoneNumber: DataTypes.TEXT,
      description: DataTypes.TEXT,
      condition: DataTypes.TEXT,
      category: DataTypes.TEXT,
      city: DataTypes.TEXT,
      image: DataTypes.TEXT,
      userId: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
