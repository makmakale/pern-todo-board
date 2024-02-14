import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import sequelize from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import routes from './routes/index.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
  createParentPath: true,
}));

app.use('/api', routes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/dist/index.html')));
}

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.error(e);
  }
};

start();
