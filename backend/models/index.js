import Task from './taskModel.js';
import User from './userModel.js';

User.hasMany(Task);
Task.belongsTo(User);

export {
  User,
  Task,
};
