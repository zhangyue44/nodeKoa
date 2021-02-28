const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { create, list } = require('../controller/label.controller');

const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/', verifyAuth, create);    // 创建标签接口
labelRouter.get('/', list);                   // 获取标签列表接口

module.exports = labelRouter;