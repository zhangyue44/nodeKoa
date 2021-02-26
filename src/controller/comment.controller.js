const commentService = require('../service/comment.service');

class CommentController {
    async create(ctx, next) {
        const { momentId, content} = ctx.request.body;
        const { id } = ctx.user;
        const result = await commentService.create(momentId, content, id)
        ctx.body = result;
    }

    async reply(ctx, next) {
        const { commentId } = ctx.params;
        const { momentId, content } = ctx.request.body;
        const { id } = ctx.user;
        const result = await commentService.reply(momentId, content, id, commentId);
        ctx.body = result;
    }

    async update(ctx, next) {
        const {commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await commentService.update(commentId, content);
        ctx.body = result;
    }

    async remove(ctx, next) {
        const {commentId } = ctx.params;
        const result = await commentService.remove(commentId);
        ctx.body = result;
    }
}

module.exports = new CommentController();