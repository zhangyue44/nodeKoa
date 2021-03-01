const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware');
const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controller');

const fileRouter = new Router({prefix: '/upload'});

// avatarHandler是保存上传的图像， saveAvatarInfo是保存图像的信息
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo);

// pictureResize是用来设置图像大小的中间件
// 例子：  http://localhost/upload/picture?momentId=1
fileRouter.post('/picture', verifyAuth, pictureHandler, pictureResize, savePictureInfo);

module.exports = fileRouter;