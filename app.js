// 导入express
const express = require('express')

// 创建web实例
const app = express()

// 导入并配置cors
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件(只能解析application/x-www-form-urlencoded格式的)
app.use(express.urlencoded({ extended: false }))

// 封装res.cc函数，优化响应的代码
// err的值可能是错误对象，也可能是字符串
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 导入全局配置文件
const config = require('./config')

// 配置解析token的中间件
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 挂载路由
// 导入并使用登录和注册的路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 导入验证数据规则的包
const joi = require('@hapi/joi');

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 表单验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    res.cc('未知的错误')
})

app.listen(80, () => {
    console.log('api server running at http://127.0.0.1');
})
