
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your backend API',
    },
    servers: [
      {
        url: 'https://rzeee.dev/',
        description: 'Production server',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], 
};

const specs = swaggerJsdoc(options);

export default specs;
