const express = require('express');
const router = express.Router()

// 导入路由函数
const user_handler = require('../router_handler/user')


// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user');


// 新用户注册接口
router.post('/reguser', expressJoi(reg_login_schema), user_handler.regUser)

// 登录
router.post('/login', expressJoi(reg_login_schema), user_handler.login)

module.exports = router


