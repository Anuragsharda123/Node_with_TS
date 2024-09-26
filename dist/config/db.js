"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Create a new Sequelize instance with the required configuration
const sequelize = new sequelize_1.Sequelize('smartdata', 'root', '123456', {
    host: "localhost",
    dialect: "mysql"
});
// Export the sequelize instance
exports.default = sequelize;
