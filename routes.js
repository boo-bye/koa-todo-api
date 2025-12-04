const Router = require('koa-router');
const { getAllTodos, createTodo, getTodoById, updateTodo, deleteTodo } = require('./todo');

const router = new Router({ prefix: '/api' });

// GET /api/todos - 获取所有 Todo
router.get('/todos', async (ctx) => {
  const todos = await getAllTodos();
  ctx.body = todos;
  ctx.status = 200;
});

// POST /api/todos - 创建新 Todo
router.post('/todos', async (ctx) => {
  const { title, completed = false } = ctx.request.body;
  
  // 验证 title 是否存在
  if (!title) {
    ctx.status = 400;
    ctx.body = { error: 'title 字段必填' };
    return;
  }
  
  const newTodo = await createTodo(title, completed);
  ctx.status = 201;
  ctx.body = newTodo;
});

// POST /api/todos/:id - 更新指定 ID 的 Todo
router.post('/todos/:id', async (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  const { title, completed } = ctx.request.body;
  
  // 检查 Todo 是否存在
  const existingTodo = await getTodoById(id);
  if (!existingTodo) {
    ctx.status = 404;
    ctx.body = { error: `Todo ID ${id} 不存在` };
    return;
  }
  
  // 准备更新的字段
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (completed !== undefined) updates.completed = completed;
  
  const updatedTodo = await updateTodo(id, updates);
  ctx.body = updatedTodo;
  ctx.status = 200;
});

// GET /api/todos/:id - 删除指定 ID 的 Todo
router.get('/todos/:id', async (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  
  const success = await deleteTodo(id);
  if (!success) {
    ctx.status = 404;
    ctx.body = { error: `Todo ID ${id} 不存在` };
    return;
  }
  
  ctx.status = 204;
  ctx.body = null;
});

module.exports = router;