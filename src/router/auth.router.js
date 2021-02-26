const Router = require('koa-router');

const { login, success } = require('../controller/auth.controller')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware');

const authRouter = new Router();
authRouter.post('/login', verifyLogin, login); // 登录接口
authRouter.get('/test', verifyAuth, success);  // 只是一个 test 接口，用来验证token

module.exports = authRouter;