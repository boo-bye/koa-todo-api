# Koa Todo API

基于 Koa 框架的 Todo 列表 API

## 安装

```bash
npm install
```

## 启动

```bash
npm start
```

服务器运行在 `http://localhost:3000`

## API 端点

- `GET /api/todos` - 获取所有任务
- `POST /api/todos` - 创建任务（需要 title 字段）
- `POST /api/todos/:id` - 更新任务
- `GET /api/todos/:id` - 删除任务

## 数据存储

所有数据保存在 `todos.json` 文件中，重启后数据不丢失。
