import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and .env!');
});

const PORT = parseInt(process.env.PORT || '3000', 10); 
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
