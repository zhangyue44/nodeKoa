const connection = require('../app/datatbase');

class MomentService {
    async create(userId, content) {
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
        const result = await connection.execute(statement, [content, userId]); 
        return result[0] // result是数组，所以要取[0]  result[0]也是一个数组
    }

    async getMomentById(momentId) {
        const statement = `SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        WHERE m.id = ?;`;
        const [result] = await connection.execute(statement, [momentId]); 
        return result[0]
    }

    async getMomentList(offset, size) {
        const statement = `SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id', u.id, 'name', u.name) author
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ?, ?;`;
        const [result] = await connection.execute(statement, [offset, size]); 
        return result
    }

    async updateMoment(content, momentId) {
        const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
        const [result] = await connection.execute(statement, [content, momentId]); 
        return result;
    }

    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?;`;
        const [result] = await connection.execute(statement, [momentId]); 
        return result;
    }
}

module.exports = new MomentService();