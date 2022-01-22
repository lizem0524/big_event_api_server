// 导入定义验证规则的包
const joi = require('@hapi/joi')

// 定义验证规则

// 登录注册的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 更新用户基本信息的规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
exports.update_userinfo_sechema = {
    body: {
        id,
        username:joi.string().alphanum().min(1).max(10).required(),
        nickname,
        email
    }
}

// 重置密码的规则
exports.update_password_sechema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
        repassword: joi.ref('newPwd')
    }
}

// 更新头像的规则
const avatar = joi.string().dataUri().required()
exports.update_avatar_sechema = {
    body: {
        avatar
    }
}