# 筆記

- 啟動mongo db:
```bash
docker start a5aaede3887d
```

- 能使用import:
> package.json 新增 type: module

-使用env
```javaScript
// npm i dotenv
import dotenv from 'dotenv';

dotenv.config()

// .env
PORT=8000
MONGO_URI='mongodb://localhost:27017/food'
```