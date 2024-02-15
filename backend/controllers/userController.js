import asyncHandler from 'express-async-handler';
import path from 'path';
import { Op } from 'sequelize';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/index.js';
import generateToken from '../utils/generateToken.js';
import ResponseHandler from '../utils/ResponseHandler.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(ResponseHandler.badRequest(res, 'Username and Password are required'));
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return next(ResponseHandler.badRequest(res, `User with "${username}" not found`));
  }

  const passwordMatch = await user.matchPassword(password);
  if (!passwordMatch) {
    return next(ResponseHandler.badRequest(res, 'Incorrect password'));
  }

  const { token } = generateToken(res, user.id);

  return ResponseHandler.success(res, {
    userInfo: {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
    },
    token,
    message: 'Logged in successfully',
  });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(ResponseHandler.badRequest(res, 'Username and Password are required'));
  }

  const userExists = await User.findOne({ where: { username } });
  if (userExists) {
    return next(ResponseHandler.badRequest(res, `User with username "${username}" already exists`));
  }

  try {
    const user = await User.create({
      username,
      password,
    });

    const { token } = generateToken(res, user.id);

    return ResponseHandler.success(res, {
      userInfo: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
      },
      token,
      message: 'Registration successful',
    });
  } catch (err) {
    return next(ResponseHandler.internal(res, err.message));
  }
});

// @desc    Refresh Token
// @route   POST /api/users/refresh
// @access  Private
const refreshToken = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const accessToken = authHeader.split(' ')[1];
  const decoded = jwtDecode(accessToken);
  const { refreshToken: token } = generateToken(res, decoded.userId);

  return ResponseHandler.success(res, { token });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password', 'updatedAt'] },
  });

  if (!user) {
    return next(ResponseHandler.badRequest(res, 'User not found'));
  }

  return ResponseHandler.success(res, user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['password', 'updatedAt'] },
  });

  if (!user) {
    return next(ResponseHandler.badRequest(res, 'User not found'));
  }

  const { username } = req.body;
  const userByUsername = await User.findOne({
    where: { username, id: { [Op.ne]: req.user.id } },
  });

  if (userByUsername) {
    return next(ResponseHandler.badRequest(res, 'User with same "username" already exist'));
  }

  const image = req.files?.image || '';

  let fileName = user.image || '';
  if (image) {
    const __dirname = path.resolve();
    const imagesDir = path.join(__dirname, 'assets/images');
    const fileExt = path.extname(image.name);
    fileName = `${req.user.id}_${username}_${Date.now()}${fileExt}`;
    try {
      await image.mv(path.join(imagesDir, fileName));
      console.log('Avatar was successfully uploaded to', imagesDir);
    } catch (err) {
      return next(ResponseHandler.internal(res, err.message));
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

  return ResponseHandler.success(res, updatedUser);
});

export {
  authUser,
  registerUser,
  refreshToken,
  getUserProfile,
  updateUserProfile,
};
