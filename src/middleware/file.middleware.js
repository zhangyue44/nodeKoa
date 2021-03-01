const Multer = require('koa-multer');      // 引入第三方模块,用来上传图片
const path = require('path');
const Jimp = require('jimp');              // npm install jimp 第三方库，用来设置图片大小
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path');

const avatarUpload = Multer({
  dest: AVATAR_PATH
});
const avatarHandler = avatarUpload.single('avatar'); // avatar字段是接口上传的字段，就是 key值 。而avatarHandler是获取到的value值

const pictureUpload = Multer({
  dest: PICTURE_PATH
});
const pictureHandler = pictureUpload.array('picture', 9);  // 数组，最多一次传9张图像

const pictureResize = async (ctx, next) => {
  try {
    // 获取所有的图像信息
    const files = ctx.req.files;
    // 对图像进行处理(jimp)
    for (let file of files) {
      const destPath = path.join(file.destination, file.filename); // file.destination 是图像所在的文件路径
      Jimp.read(file.path).then(image => {                         // 读取图像
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);  // 设置图像大小，宽1280像素，高自动，write是设置图像大小更改后的文件路径与名字
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      });
    }
    await next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}