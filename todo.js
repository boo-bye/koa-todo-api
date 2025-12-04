const fs = require('fs').promises;
const path = require('path');

const TODOS_FILE = path.join(__dirname, 'todos.json');

// 读取所有 Todo 列表
async function getAllTodos() {
  try {
    const data = await fs.readFile(TODOS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // 文件不存在或为空，返回空数组
    return [];
  }
}

// 保存 Todo 列表到文件
async function saveTodos(todos) {
  await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf-8');
}

// 创建新的 Todo
async function createTodo(title, completed = false) {
  const todos = await getAllTodos();
  
  // 生成 ID（取最大 ID + 1）
  const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
  const id = maxId + 1;
  
  const newTodo = {
    id,
    title,
    completed,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  await saveTodos(todos);
  
  return newTodo;
}

// 根据 ID 获取单个 Todo
async function getTodoById(id) {
  const todos = await getAllTodos();
  return todos.find(t => t.id === id);
}

// 根据 ID 更新 Todo
async function updateTodo(id, updates) {
  const todos = await getAllTodos();
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return null; // Todo 不存在
  }
  
  // 只更新提供的字段
  if (updates.title !== undefined) {
    todos[index].title = updates.title;
  }
  if (updates.completed !== undefined) {
    todos[index].completed = updates.completed;
  }
  
  await saveTodos(todos);
  return todos[index];
}

// 根据 ID 删除 Todo
async function deleteTodo(id) {
  const todos = await getAllTodos();
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return false; // Todo 不存在
  }
  
  todos.splice(index, 1);
  await saveTodos(todos);
  return true;
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
};