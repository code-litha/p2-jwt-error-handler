"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Username has been already exist`,
        },
        validate: {
          notNull: {
            msg: `Username can't be null`,
          },
          notEmpty: {
            msg: `Username can't be empty`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password can't be null`,
          },
          notEmpty: {
            msg: `Password can't be empty`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Role can't be null`,
          },
          notEmpty: {
            msg: `Role can't be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  // HOOKS UNTUK NGEHASH PASSWORD USER SEBELUM KE INSERT / CREATE
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
