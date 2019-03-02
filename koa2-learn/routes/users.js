const router = require('koa-router')()
const Person = require('../dbs/models/person') // 引入模型model

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 定义一个接口: addPerson，接口类型为post，需要给接口传name和age字段
router.post('/addPerson', async function (ctx) {
    //根据模型model创建实例
    const person = new Person({
        name: ctx.request.body.name,
        age:ctx.request.body.age
    })
    let code
    try {
        await person.save()
        // 通过 save()方法，增添数据
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
module.exports = router
