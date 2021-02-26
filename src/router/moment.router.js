const { verify } = require('jsonwebtoken');
const Router = require('koa-router');

const { verifyAuth, verifyPermission} = require('../middleware/auth.middleware');
const { create, detail, list, update, remove} = require('../controller/moment.controller');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create); // 插入动态接口
momentRouter.get('/', list)                 // 获取多个动态详情接口
momentRouter.get('/:momentId', detail)      // 获取单个动态详情接口

// 用户必须登录， 用户具有权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)    // 修改详情接口
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)    // 删除详情接口

module.exports = momentRouter;