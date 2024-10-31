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
        url: `http://${process.env.HOST}:${process.env.PORT}/api`, // URL of your API
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply the bearer authentication globally
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpecs = swaggerJsDoc(options);

export { swaggerUi, swaggerSpecs };
