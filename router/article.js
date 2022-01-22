const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章的验证模块
const { add_article_schema } = require('../schema/article')

// 导入路由处理函数
const article_handler = require('../router_handler/article')

// 导入解析formdata格式表单数据的包
const multer = require('multer')

// 导入处理路径的内置模块
const path = require('path')

// 创建multer的实例对象
const upload = multer({ dest: path.join(__dirname, '../uploads') })

// 发布文章的路由
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)







module.exports = router