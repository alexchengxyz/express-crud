import Task from '../models/Task';
import asyncWrapper from '../middleware/async';

const getAllTasks = asyncWrapper(async (req, res) => {
  const ret = await Task.find({});

  res.status(200).json({ result: 'ok', ret });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.body;
  const ret = await Task.findOne({ _id: id });

  if (!ret) {
    res.status(404).json({ message: `找不到此ID : ${id}` });
  }

  res.status(200).json({ result: 'ok', ret });
});

const addTask = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;

  const ret = new Task({ name, completed });

  await ret.save();

  res.status(201).json({ result: 'ok', ret });
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const ret = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!ret) {
      return next(`找不到此ID : ${id}`, 404);
    }

    res.status(200).json({ result: 'ok', ret });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const ret = await Task.findOneAndDelete({ _id: id });

  if (!ret) {
    res.status(404).json({ message: `找不到此ID` });
  }

  res.status(200).json({ result: 'ok' });
});

export {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
}
