//文章分类的路由处理函数
// 导入数据库
const db = require('../db/index')

// 定义获取文章分类数据的路由处理函数
exports.getArticleCate = (req, res) => {
    // 定义查询未被删除的文章分类列表
    const sqlStr = 'select * from ev_article_cate where is_delete=0 order by id ASC'
    // 执行语句
    db.query(sqlStr, (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 执行成功
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results
        })
    })
}
// 新增文章分类的路由处理函数
exports.addArticleCates = (req, res) => {
    const sqlStr = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sqlStr, [req.body.name, req.body.alias], (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 执行成功,判断名称和别名是否被占用
        if (results.length === 2) return res.cc('分类名称和别名被占用')
        if (results.length === 1) {
            if (results[0].name === req.body.name && results[0].alias === req.body.alias) {
                return res.cc('分类名称和别名被占用')
            }
            if (results[0].name === req.body.name) {
                return res.cc('分类名称被占用')
            }
            // console.log(results);
            if (results[0].alias === req.body.alias) {
                return res.cc('分类别名被占用')
            }
        }
        // 定义插入分类的语句
        const sqlStr = 'insert into ev_article_cate set ?'
        db.query(sqlStr, req.body, (err, results) => {
            // 语句执行失败
            if (err) return rec.cc(err)
            // 影响行数不为1
            if (results.affectedRows !== 1) return res.cc('新增分类失败')
            res.cc('新增分类成功', 0)
        })
    })
}

// 根据id删除文章分类的路由函数
exports.deleteCateById = (req, res) => {
    const sqlStr = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sqlStr, req.params.id, (err, results) => {
        // 执行语句失败
        if (err) return res.cc(err)
        // 影响行数不为1
        if (results.affectedRows !== 1) return res.cc('删除失败')
        res.cc('删除成功', 0)
    })
}

// 根据id获取文章分类的路由函数
exports.getArtCateById = (req, res) => {
    // 定义根据id查询分类数据的语句
    const sqlStr = 'select * from ev_article_cate where id=?'
    db.query(sqlStr, req.params.id, (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 没有结果
        if (results.length !== 1) return res.cc('获取文章分类失败')
        // 成功
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0]
        })
    })
}

// 根据id更新文章分类的路由函数
exports.updateCateById = (req, res) => {
    // 定义查询语句，查询除要修改的此条分类外是否有重名
    const sqlStr = 'select * from ev_article_cate where id!=? and (name=? or alias=?)'
    db.query(sqlStr, [req.body.Id,req.body.name, req.body.alias], (err, results) => {
        // 语句执行失败
        if (err) return res.cc(err)
        // 执行成功,判断名称和别名是否被占用
        if (results.length === 2) return res.cc('分类名称和别名被占用')
        if (results.length === 1) {
            if (results[0].name === req.body.name && results[0].alias === req.body.alias) {
                return res.cc('分类名称和别名被占用')
            }
            if (results[0].name === req.body.name) {
                return res.cc('分类名称被占用')
            }
            // console.log(results);
            if (results[0].alias === req.body.alias) {
                return res.cc('分类别名被占用')
            }
        }
        // 定义更新文章分类的sql语句
        const sqlStr = 'update ev_article_cate set ? where id=?'
        db.query(sqlStr, [req.body, req.body.Id], (err, results) => {
            // 执行失败
            if (err) return res.cc(err)
            // 影响行数不为1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.cc('更新文章分类成功', 0)
        })
    })

}