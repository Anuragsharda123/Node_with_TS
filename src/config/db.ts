import { Sequelize } from 'sequelize';

// Create a new Sequelize instance with the required configuration
const sequelize = new Sequelize('smartdata', 'root', '123456', {
    host: "localhost",
    dialect: "mysql"
});

// Export the sequelize instance
export default sequelize;
