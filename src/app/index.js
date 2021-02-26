const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const useRoutes = require('../router') // 会自动加载 router文件夹中的 index.js

const app = new Koa();

const errorHandle = require('./err-handle')

app.use(bodyParser());

useRoutes(app); // 注册路由

// 错误处理
app.on('error', errorHandle)

module.exports = app;