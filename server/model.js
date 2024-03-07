const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shop: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
    timestamps: false,
});

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cart: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cartTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = { Product, Order };