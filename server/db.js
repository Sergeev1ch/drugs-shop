require('dotenv').config()
const { Sequelize } = require('sequelize');

const dbName = process.env.DBNAME;
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASS;
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;