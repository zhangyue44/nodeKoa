const jwt = require('jsonwebtoken');
const errorType = require('../constants/err-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const md5password  = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async(ctx, next) => {
    // 获取用户名和密码
    const {name, password} = ctx.request.body;
    // 判断用户名和密码是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户是否存在
    const result = await userService.getUserByName(name);
    const user = result[0];
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS);
        return ctx.app.emit('error', error, ctx)
    }
    // 判断密码是否和数据库中的密码一致（加密）
    if (md5password(password) !== user.password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT);
        return ctx.app.emit('error', error, ctx)
    }

    // 将 user 保存起来
    ctx.user = user;
    await next();
}

const verifyAuth = async(ctx, next) => {    // 检查用户是否授权
    // 获取请求携带的token
    const authorization = ctx.headers.authorization; 
    if (!authorization) {  // 用户没有授权
        const error = new Error(errorType.UNAUTHORIZATION);
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace("Bearer ", "");     // 重点： Bearer后面有一个空格!!!!!
    // 验证 token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        });
        // console.log(result); // { id: 5, name: 'rzz', iat: 1614147994, exp: 1614234394 }
        ctx.user = result;
        await next();
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION);
        ctx.app.emit('error', error, ctx)
    }
}

const verifyPermission = async(ctx, next) => {
    // 获取参数
    const [resourceKey] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    const resourceId = ctx.params[resourceKey];
    const { id } = ctx.user;
    // 查询是否具备权限 返回 true 或 false
    const isPermission = await authService.checkResource(tableName,resourceId, id);
    if (!isPermission) {
        const error = new Error(errorType.UNPERMISSION);
        return ctx.app.emit('error', error, ctx)
    }
    await next();
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}