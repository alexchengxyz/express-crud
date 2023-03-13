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

  if (!ret) {
    return next(customError(`找不到此ID : ${id}`, 404))
  }

  res.status(200).json({ result: 'ok', ret });
});

// 新增資料
const addTask = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;

  const ret = new Task({ name, completed });

  await ret.save();

  res.status(201).json({ result: 'ok', ret });
})

// 更新單筆資料
const updateTask = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const ret = await Task.findOneAndUpdate({ _id: id.trim() }, req.body, {
      new: true, // 返回結果
      runValidators: true, // 驗證格式
    });

    if (!ret) {
      return next(`找不到此ID : ${id}`, 404);
    }

    res.status(200).json({ result: 'ok', ret });
});

// 移除單筆資料
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const ret = await Task.findOneAndDelete({ _id: id });

  if (!ret) {
    return next(customError(`找不到此ID : ${id}`, 404))
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
