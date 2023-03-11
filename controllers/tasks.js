import Task from '../models/Task';
import asyncWrapper from '../middleware/async';
import { customError } from '../errors/custom-error';


// 取得列表
const getAllTasks = asyncWrapper(async (req, res) => {
  const ret = await Task.find({});

  res.status(200).json({ result: 'ok', ret });
});

// 取得單筆資料
const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const ret = await Task.findOne({ _id: id });

  console.log('===>', ret)

  // if (!ret) {
  //   return next(customError(`找不到此ID : ${id}`, 404))
  //   // res.status(404).json({ message: `找不到此ID : ${id}` });
  // }

  res.status(200).json({ result: 'ok', ret });
});

// 新增資料
const addTask = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;

  const ret = new Task({ name, completed });

  await ret.save();

  res.status(201).json({ result: 'ok', ret });
})

// 移除單筆資料
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
  console.log(ret)

  // if (!ret) {
  //   console.log(555)
  //   return next(customError(`No task with id : ${id}`, 404))
  //   res.status(404).json({ message: `找不到此ID` });
  // }

  res.status(200).json({ result: 'ok' });
});

export {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
}
