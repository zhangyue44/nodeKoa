const { verify } = require('jsonwebtoken');
const Router = require('koa-router');

const { verifyAuth, verifyPermission} = require('../middleware/auth.middleware');
const { verifyLabelExists } = require('../middleware/label.middlerware');
const { create, detail, list, update, remove, addLabels, fileInfo} = require('../controller/moment.controller');

const momentRouter = new Router({prefix: '/moment'});

momentRouter.post('/', verifyAuth, create); // 插入动态接口
momentRouter.get('/', list)                 // 获取多个动态详情接口
momentRouter.get('/:momentId', detail)      // 获取单个动态详情接口

// 用户必须登录， 用户具有权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)    // 修改详情接口
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)    // 删除详情接口

momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels); // 给动态添加标签

momentRouter.get('/images/:filename', fileInfo);    // 动态配图的服务

module.exports = momentRouter;