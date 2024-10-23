import * as dotenv from 'dotenv'; // Use named import for dotenv
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// Create a new instance of Sequelize for the SQL Server database
const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'mssql', // Change this according to your database (e.g., 'mysql', 'postgres')
  logging: false,    // Disable logging; default: console.log
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the test function to check the connection
testConnection();

export default sequelize;
