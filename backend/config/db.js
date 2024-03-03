import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import pg from 'pg';

dotenv.config();

export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    dialectModule: pg,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: process.env.NODE_ENV === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    } : {},
    logging: false,
  },
);
