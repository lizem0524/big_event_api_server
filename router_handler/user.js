// 导入数据库
const db = require('../db/index')
// 导入bcryptjs包 密码加密
const bcrypt = require('bcryptjs')
// 定义路由函数并暴露
exports.regUser = (req, res) => {
    const userinfo = req.body
    // 对表单数据进行合法性的校验
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法' })
    //     return res.cc('用户名和密码不合法')
    // }

    // 定义SQL查询语句，查询用户名是否被占用
    const sqlStr = 'SELECT * FROM ev_users WHERE username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // SQL语句执行失败
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length !== 0) {
            return res.cc('用户名被占用！')
        }
        // 调用bcrypt.hashSync()对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 定义插入用户的SQL语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) { return res.cc(err) }
            if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试！')
            res.cc('注册成功',0)
        })
    })
}

exports.login = (req, res) => {
    res.send('ok');
}

