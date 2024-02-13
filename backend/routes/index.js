import express from 'express';
import userRoutes from './userRoutes.js';
import taskRoutes from './taskRoutes.js';

const app = express();

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

export default app;
