// src/docs/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'User API', // Title of your API
      version: '1.0.0', // Version of your API
      description: 'API documentation for user management',
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`, // URL of your API
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpecs = swaggerJsDoc(options);

export { swaggerUi, swaggerSpecs };
