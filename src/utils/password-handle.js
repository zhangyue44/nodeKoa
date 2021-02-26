const crypto = require('crypto')  // 系统自带的库

// 封装函数，将密码明文改暗文
const md5password = (password) => {
    const md5 = crypto.createHash('md5')
    const result = md5.update(password).digest('hex') // hex 是将二进制的暗文改为16进制的
    return result;
}

module.exports = md5password;