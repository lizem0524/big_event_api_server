// 导入数据库操作模块
const db = require('../db/index')

const bcrypt = require('bcryptjs')

// 获取用户基本信息的处理函数
exports.getuserinfo = (req, res) => {
    // 定义查询用户信息的SQL语句
    const sqlStr = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    db.query(sqlStr, req.user.id, (err, results) => {
        // 执行语句失败
        if (err) return res.cc(err)
        // 查询结果为空的情况
        if (results.length !== 1) return res.cc('获取用户信息失败')
        // 获取用户信息成功，响应数据
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

//更新用户基本信息的处理函数
exports.updateUserInfo = (req, res) => {
    console.log(req.body);
    const sqlStr = 'update ev_users set ? where id=?'
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 语句执行成功，但影响行数不等于1
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
        // 执行成功
        res.cc('用户信息更新成功', 0)
    })
}

// 重置密码的处理函数
exports.updatePassword = (req, res) => {
    console.log(req.body);
    // 定义查询语句 查询原密码
    const sqlStr = 'select * from ev_users where id=?'
    db.query(sqlStr, req.user.id, (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 查询结果不为1
        if (results.length !== 1) return res.cc('用户不存在！')
        // 比较用户输入的旧密码和数据库中的密码
        const compareresult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareresult) return res.cc('原密码输入错误')

        // 原密码输入正确，更新数据库密码为新密码
        // 定义更新密码语句
        const sqlStr = 'update ev_users set password=? where id=?'
        // 新密码加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 执行语句
        db.query(sqlStr, [newPwd, req.user.id], (err, results) => {
            // 语句执行失败
            if (err) return res.cc(err)
            // 影响行数不为1
            if (results.affectedRows !== 1) return res.cc('修改失败')
            res.cc('修改密码成功', 0)
        })
    })
}

// 更换头像的处理函数
exports.updateAvatar = (req, res) => {
    // 定义更新头像数据的sql语句
    const sqlStr = 'update ev_users set user_pic=? where id=?'
    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 影响行数不为1
        if (results.affectedRows !== 1) return res.cc('更新头像失败')
        res.cc('更新头像成功', 0)
    })
}