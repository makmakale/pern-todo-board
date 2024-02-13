import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Task = sequelize.define('task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  type: {
    type: DataTypes.STRING,
    defaultValue: 'task',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'todo',
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Task;
