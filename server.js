import connectDB from './backend/config/db.js';
import accountRoutes from './backend/routes/accountRoute.js';
import express from 'express'
import cors from 'cors';
import { port } from './config.js';

const app = express();
const PORT = port || 5000;

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api', accountRoutes);

app.listen(PORT, console.log(`App is running on port ${PORT}`));