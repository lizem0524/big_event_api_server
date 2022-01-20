// 导入数据库包
const mysql = require('mysql')
// // 建立连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'my_db_01'
})
// 暴露
module.exports = db