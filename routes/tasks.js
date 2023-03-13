import express from "express";
import {
  getAllTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from '../controllers/tasks'

const router = express.Router()

router.route('/').get(getAllTasks).post(addTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

export default router;
