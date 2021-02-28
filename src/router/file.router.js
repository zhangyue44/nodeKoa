const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { avatarHandler } = require('../middleware/file.middleware');
const { saveAvatarInfo } = require('../controller/file.controller');

const fileRouter = new Router({prefix: '/upload'});

// avatarHandler是保存上传的图像， saveAvatarInfo是保存图像的信息
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);
// fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter;