// 文章分类的路由
const expressJoi = require('@escook/express-joi')
const express = require('express')
const router = express.Router()

// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')

// 导入表单验证规则的中间件
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/adtcate')

// 获取文章分类数据的路由
router.get('/cates', artcate_handler.getArticleCate)

// 新增文章分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)

// 删除文章分类的路由
router.get('/delete/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

// 根据id获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)

// 根据id更新文章分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

// 暴露
module.exports = router