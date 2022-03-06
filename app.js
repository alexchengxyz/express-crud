import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import tasks from './routes/tasks.js';
import notFound  from './middleware/not-found.js';

/*
  *參考
  *https://github.com/john-smilga/node-express-course/blob/main/03-task-manager/final/app.js
  */

dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(notFound);

connectDB(process.env.MONGO_URI);

app.listen(port, function () {
  console.log(`Server running on port ${port}!`);
})
