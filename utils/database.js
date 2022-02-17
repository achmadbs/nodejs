const { Sequelize } = require('sequelize');

/**
 * @param {nodejs} dbname
 * @param {root} usermysql
 * @param {last} passwordUser
 */
const sequelize = new Sequelize('nodejs', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
