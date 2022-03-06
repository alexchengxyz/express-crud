import express from "express";
import {
  getAllTasks,
  addTask,
  deleteTask,
} from '../controllers/tasks'

const router = express.Router()

router.route('/').get(getAllTasks).post(addTask);

// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
router.route('/:id').delete(deleteTask);

export default router;
