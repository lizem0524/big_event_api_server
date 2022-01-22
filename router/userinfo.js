const express = require('express')
const router = express.Router()

// 导入路由处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const { update_userinfo_sechema, update_password_sechema, update_avatar_sechema } = require('../schema/user')

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getuserinfo)

// 更新用户基本信息的路由
router.post('/userinfo', expressJoi(update_userinfo_sechema), userinfo_handler.updateUserInfo)

// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_sechema), userinfo_handler.updatePassword)

// 更换头像的路由
router.post('/update/avatar', expressJoi(update_avatar_sechema), userinfo_handler.updateAvatar)



module.exports = router