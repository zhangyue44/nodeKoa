const momentService = require('../service/monent.service');

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
}

module.exports = new MonentController();