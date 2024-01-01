import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import { handleError } from './utils/errorHandling';
import swaggerSpecs from '../docs/swagger';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Your existing routes
app.use("/api", router);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  handleError(res, err); 
});

// Catch-all middleware for invalid routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Invalid Resource Path' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
