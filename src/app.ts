import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes';
import usersRoutes from './routes/userRoutes';
import logger from './utils/logger';
import { swaggerSpecs, swaggerUi } from './swagger/swagger';
import 'colors';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Log incoming requests
app.use((req: Request, res: Response, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Use the customer routes
app.use('/api/customers', customerRoutes); 

app.use('/api/users', usersRoutes); 

// Log errors
app.use((err: any, req: Request, res: Response, next: any) => {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});

const PORT = parseInt(process.env.PORT || '3000', 10); 
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`.blue);
  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`.green);
});
