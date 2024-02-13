import express from 'express';
import {
  getTaskList,
  getTask,
  createTask,
  updateTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getTaskList)
  .post(protect, createTask);
router
  .route('/:taskId')
  .get(protect, getTask)
  .put(protect, updateTask);

export default router;
