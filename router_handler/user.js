// 导入数据库
const db = require('../db/index')

// 导入bcryptjs包 密码加密
const bcrypt = require('bcryptjs')

// 导入生成加密字符串的包
const jwt = require('jsonwebtoken')

// 导入全局配置文件
const config = require('../config')

// 定义路由函数并暴露
// 注册新用户的处理函数
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
            res.cc('注册成功', 0)
        })
    })
}

// 用户登陆的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    // 定义查询语句 查询用户提交的用户名的数据信息
    const sqlStr = 'select * from ev_users where username=?'
    // 执行查询语句
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 判断数据库是否报错
        if (err) return res.cc(err)
        // 判断数据库是否有该用户名
        if (results.length !== 1) return res.cc('用户名输入错误')
        // 比较用户提交的密码和数据库中的密码
        const compareresult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareresult) return res.cc('密码输入错误')

        // 登录成功，生成token字符串返回给客户端
        const user = { ...results[0], password: null, user_pic: null } // 剔除用户敏感信息，生成新的用户信息对象
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer' + tokenStr
        })
    })
}

