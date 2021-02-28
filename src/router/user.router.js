const Router = require('koa-router');

const { create, avatarInfo } = require('../controller/user.controller')
const { verfyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'});
userRouter.post('/', verfyUser, handlePassword, create); // verfyUser中间件 用来判断用户名和密码的逻辑
userRouter.get('/:userId/avatar', avatarInfo);  // 展示头像图片

module.exports = userRouter;