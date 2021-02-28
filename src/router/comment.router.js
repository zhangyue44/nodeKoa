const Router = require('koa-router');

const { create, reply, update, remove, list } = require('../controller/comment.controller');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/', verifyAuth, create); // 发表评论
commentRouter.post('/:commentId/reply', verifyAuth, reply); // 回复评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);  // 修改评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);  // 删除评论
 

commentRouter.get('/', list);   // 获取评论列表

module.exports = commentRouter;