const fs = require('fs');
const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
    async create(ctx, next) {
        // 获取用户请求传递的参数
        const user = ctx.request.body;
        // console.log(user);
        //查询数据
        const result = await userService.create(user);
        //返回数据
        ctx.body = result;
    }

    async avatarInfo(ctx, next) {
        // 用户的头像是哪一个文件呢?
        const { userId } = ctx.params;
        const avatarInfo = await fileService.getAvatarByUserId(userId);
        // 提供图像信息
        ctx.response.set('content-type', avatarInfo.mimetype); // 设置类型， 写了这个才会展示图像， 不然就是直接下载文件了
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`); // 相对路径，相对于zhangyue这个文件夹，就是终端启动的文件夹
    }
}

module.exports = new UserController();