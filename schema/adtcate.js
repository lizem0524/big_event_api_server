// 导入定义验证规则的包
const joi = require('@hapi/joi')

// 定义验证规则
// 定义添加文章分类的规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 定义删除文章分类id的规则
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params: {
        id
    }
}
// 根据id获取文章分类数据
exports.get_cate_schema = {
    params: {
        id
    }
}

// 根据Id更新文章分类数据
exports.update_cate_schema = {
    body: {
        Id:id,
        name,
        alias
    }
}