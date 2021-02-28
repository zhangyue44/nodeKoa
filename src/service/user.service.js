const connection = require('../app/datatbase');

class UserService {
    async create(user) {
        //将user存储到数据库中
        const { name, password } = user;
        const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
        const result = await connection.execute(statement, [name, password]); // name和password 就是代替statement中的两个问号
        return result[0] // result是数组，所以要取[0]  result[0]也是一个数组
    }

    async getUserByName(name) { // 查询 name 值是否存在
        const statement = `SELECT * FROM user WHERE name = ?;`;
        const result = await connection.execute(statement, [name]);
        return result[0];
    }

    async updateAvatarUrlById(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }
}

module.exports = new UserService();