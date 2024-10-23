import * as dotenv from 'dotenv'; // Use named import for dotenv

// Load environment variables from .env file
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DATABASE_URL, // Use DATABASE_URL from .env
  },
  jwtSecret: process.env.JWT_SECRET || 'default_secret', // For JWT token
  // Add other configurations as needed
};

export default config;
