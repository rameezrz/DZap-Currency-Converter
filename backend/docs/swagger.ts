
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DZap Currency Converter',
      version: '1.0.0',
      description: 'This project is a simple currency converter application that allows users to convert amounts between different cryptocurrencies and traditional currencies.',
    },
    servers: [
      {
        url: 'https://rzeee.dev',
        description: 'Production server',
      },
    ],
  },
  apis: ['src/routes/*.ts', 'src/controllers/*.ts'], 
};

const specs = swaggerJsdoc(options);

export default specs;
