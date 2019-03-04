const router = require('koa-router')()
const Person = require('../dbs/models/person') // 引入模型model

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 1. 向数据库“增加”数据 --->实例.save()
// 定义一个接口: addPerson，接口类型为post，需要给接口传name和age字段
router.post('/addPerson', async function (ctx) {
    //根据模型model创建实例----文档
    const person = new Person({
        name: ctx.request.body.name,
        age:ctx.request.body.age
    })
    let code
    try {
        await person.save()
        // save()---实例方法
        // 通过 实例.save()方法，增添数据
        // 这个save()方法，是model中已经定义好的，可以直接用
        code = 0
    }catch (e) {
        code = 1
    }
    // 定义接口需要返回的数据
    ctx.body = {
      code: code
    }
})

// addPerson接口的访问方式：使用git bash，输入：
// curl -d 'name=lilei&age=27' http://localhost:3000/users/addPerson
// 返回结果为 { 'code': 0 }
// curl 是 shell 命令，所以必须使用 git bash


// 2. 从数据库“读取”数据---->find()、findOne()是模型的静态方法
router.post('/getPerson',async function (ctx) {

    // findOne()------>只是查找某一条记录，查到第一条即停止，不会继续向下查找
    const result = await Person.findOne({
        name: ctx.request.body.name
    })

    //find()------->返回符合条件的数据的集合
    const results = await Person.find({
        name: ctx.request.body.name
    })
    ctx.body = {
        code:0,
        result,
        results
    }
})

// getPerson的访问方式：使用git bash 输入：
// curl -d 'name=lilei' http://localhost:3000/users/getPerson
// 返回结果为：
// {
//     "code": 0,
//     "result": {
//     "_id": "5c7cd28a77df23331c3e9d7b",
//         "name": "hanmeimei",
//         "age": 17,
//         "__v": 0
// },
//     "results": [
//     {
//         "_id": "5c7cd28a77df23331c3e9d7b",
//         "name": "hanmeimei",
//         "age": 17,
//         "__v": 0
//     },
//     {
//         "_id": "5c7cd6bd7fed7839c00ff43d",
//         "name": "hanmeimei",
//         "age": 38,
//         "__v": 0
//     }
// ]
// }

// 3.改数据-----update()模型的静态方法
router.post('/updatePerson', async function (ctx) {
    const result = await Person.where({
        name: ctx.request.body.name
    }).update({
        age:ctx.request.body.age
    })
    ctx.body = {
        code: 0
    }
})
// curl -d 'name=lilei&age=11' http://localhost:3000/users/updatePerson
//{
//   "code": 0
// }
// 数据库中的leilei这条记录age改为了11

// 4. 删除数据-----remove()模型方法
router.post('/removePerson', async function (ctx) {
    const result = await Person.where({
        name: ctx.request.body.name
    }).remove()
    ctx.body = {
        code: 0
    }
})
//curl -d 'name=lilei' http://localhost:3000/users/removePerson
//{
//   "code": 0
// }
// 数据库中的leilei这条记录被删除了

module.exports = router
