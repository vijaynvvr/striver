const { DataTypes } = require('sequelize');
const { sequelize } = require('./config');

const Code = sequelize.define('Code', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  language: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stdin: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  stdout: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Codes',
  timestamps: false,
});

module.exports = Code;