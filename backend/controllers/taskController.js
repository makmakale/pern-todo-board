import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';
import { Task, User } from '../models/index.js';
import ResponseHandler from '../utils/ResponseHandler.js';

// @desc    Full list of tasks
// @route   GET /api/tasks
// @access  Public
const getTaskList = asyncHandler(async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName', 'image'],
          as: 'user',
        },
      ],
      order: ['order'],
    });

    return ResponseHandler.success(res, tasks);
  } catch (err) {
    return next(ResponseHandler.internal(res, err.message));
  }
});

// @desc    Task details
// @route   POST /api/tasks/:taskId
// @access  Private
const getTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.taskId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName', 'image'],
          as: 'user',
        },
      ],
    });

    return ResponseHandler.success(res, task);
  } catch (err) {
    return next(ResponseHandler.internal(res, err.message));
  }
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user?.id });

    // reorder other tasks
    const { status } = req.body;

    const otherTasks = await Task.findAll({ where: { status, id: { [Op.ne]: task.id } } });
    if (otherTasks.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const otherTask of otherTasks) {
        otherTask.order += 1;
        // eslint-disable-next-line no-await-in-loop
        await otherTask.save();
      }
    }

    return ResponseHandler.success(res, task);
  } catch (err) {
    return next(ResponseHandler.internal(res, err.message));
  }
});

// @desc    Update task
// @route   PUT /api/tasks
// @access  Private
const updateTask = asyncHandler(async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;

    const task = await Task.findOne({
      where: { id: +id },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName', 'image'],
          as: 'user',
        },
      ],
    });

    await task.update({
      ...rest,
      userId: task.userId || req.user?.id,
    });
    await task.save();

    // reorder other tasks
    const { order, status } = rest;

    const otherTasks = await Task.findAll({ where: { status, id: { [Op.ne]: task.id } } });
    if (otherTasks.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const otherTask of otherTasks) {
        if (otherTask.order >= order) {
          otherTask.order += 1;
          // eslint-disable-next-line no-await-in-loop
          await otherTask.save();
        }
      }
    }

    return ResponseHandler.success(res, task);
  } catch (err) {
    return next(ResponseHandler.internal(res, err.message));
  }
});

export {
  getTaskList,
  getTask,
  createTask,
  updateTask,
};
