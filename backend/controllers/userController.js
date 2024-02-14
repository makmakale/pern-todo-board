import asyncHandler from 'express-async-handler';
import path from 'path';
import { Op } from 'sequelize';
import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400);
    throw new Error('Username is required');
  }
  if (!password) {
    res.status(400);
    throw new Error('Password is required');
  }

  const user = await User.findOne({ where: { username } });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user.id);

    res.json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400);
    throw new Error('Username is required');
  }
  if (!password) {
    res.status(400);
    throw new Error('Password is required');
  }

  const userExists = await User.findOne({ where: { username } });

  if (userExists) {
    res.status(400);
    throw new Error(`User with username "${username}" already exists`);
  }

  const user = await User.create({
    username,
    password,
  });

  if (user) {
    generateToken(res, user.id);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password', 'updatedAt'] },
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password', 'updatedAt'] },
  });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { username } = req.body;
  const userByUsername = await User.findOne({
    where: { username, id: { [Op.ne]: req.user.id } },
  });

  if (userByUsername) {
    res.status(400);
    throw new Error('User with same "username" already exist');
  }

  const image = req.files?.image || '';

  let fileName = user.image || '';
  if (image) {
    const __dirname = path.resolve();
    const imagesDir = path.join(__dirname, '/frontend/dist');
    const fileExt = path.extname(image.name);
    fileName = `/images/${req.user.id}_${username}_${Date.now()}${fileExt}`;
    try {
      await image.mv(path.join(imagesDir, fileName));
      console.log('Avatar was successfully uploaded to', imagesDir);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.update({
    ...req.body,
    image: fileName,
  });
  const updatedUser = await user.save();

  res.json(updatedUser);
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
