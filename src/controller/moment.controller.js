const fs = require('fs');
const momentService = require('../service/monent.service');
const FileService = require('../service/file.service');
const { PICTURE_PATH } = require('../constants/file-path');

class MonentController {
    async create(ctx, next) {
        // 获取数据
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        // 将数据插入数据库中
        const result = await momentService.create(userId, content);
        ctx.body = result;
    };

    async detail(ctx, next) {
        // 获取数据
        const momentId = ctx.params.momentId;
        // 根据id查找数据
        const result = await momentService.getMomentById(momentId);
        ctx.body = result;
    }

    async list(ctx, next) {
        // 获取数据
        const { offset, size } = ctx.query;
        // 查询列表
        const result = await momentService.getMomentList(offset, size);
        ctx.body = result;
    }

    async update(ctx, next) {
        // 获取数据
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;
        // 修改内容
        const result = await momentService.updateMoment(content, momentId);
        ctx.body = result;
    }

    async remove(ctx, next) {
        // 获取数据
        const momentId = ctx.params.momentId;
        // 删除
        const result = await momentService.remove(momentId);
        ctx.body = result;
    }

    async addLabels(ctx, next) {
        // 获取标签和动态id
        const { labels } = ctx;
        const { momentId } = ctx.params;
        // 添加所有的标签
        for (let label of labels) {
          // 2.1.判断标签是否已经和动态有关系
          const isExist = await momentService.hasLabel(momentId, label.id);
          if (!isExist) {  // 没有关系时
            await momentService.addLabel(momentId, label.id);
          }
        }
        ctx.body = "给动态添加标签成功~";
    }

    async fileInfo(ctx, next) {
        let { filename } = ctx.params;
        const fileInfo = await fileService.getFileByFilename(filename);
        const { type } = ctx.query;                         // http://localhost/moment/.../filename?type=small
        const types = ["small", "middle", "large"];
        if (types.some(item => item === type)) {
          filename = filename + '-' + type;
        }
    
        ctx.response.set('content-type', fileInfo.mimetype);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    }
}

module.exports = new MonentController();