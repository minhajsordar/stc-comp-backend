import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import config from '@/config';
import { AppDataSource } from '@/database/data-source';
import routes from './src/routes';

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'STC API Server', version: '1.0.0' });
});

app.use('/api', routes);

const PORT = config.port;

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });

export default app;