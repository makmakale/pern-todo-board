import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/db.js';

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: { type: DataTypes.STRING },
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  image: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
});

User.beforeSave(async (user) => {
  if (!user.changed('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.prototype.matchPassword = async function (enteredPassword) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;
