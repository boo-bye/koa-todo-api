const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');

const app = new Koa();
const PORT = 3000;

// 中间件：请求体解析
// 这个中间件会自动解析 JSON 请求体，存储在 ctx.request.body
app.use(bodyParser());

// 中间件：路由处理
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📝 Todo API 已启动`);
});

module.exports = app;