
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
        url: 'http://localhost:8000/', // Update with your server's URL
        description: 'Local development server',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], 
};

const specs = swaggerJsdoc(options);

export default specs;
