"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Title can't be null`,
          },
          notEmpty: {
            msg: `Title can't be empty`,
          },
        },
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
