const mongoose = require('mongoose')

// 声明一个schema---描述表中的字段
// 在 Mongoose 中，所有东西都从一个 Schema 开始。
let personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

// 由schema生成一个model并导出
// 在 Mongoose 中，模型是通过已定义的 Schema 生成
module.exports = mongoose.model('Person', personSchema)

/**
*  知识点：
 *  数据库--->数据表--->model---->schema
 *   dbs    person.js   Person     name,age字段
 *
 *   注意数据表的名字，默认为文件名---person.js
 *   所以models目录下的，文件名不要随便取，因为models目录下的文件名就是对象数据库里面的表的名字
 *
 *   mongoose: 集合collection----文档document----field
 *
 *   mysql: 表table----row ----column
* */