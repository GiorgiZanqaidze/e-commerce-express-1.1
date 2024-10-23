import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Use the customer routes
app.use('/api/customers', customerRoutes); 


const PORT = parseInt(process.env.PORT || '3000', 10); 
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
