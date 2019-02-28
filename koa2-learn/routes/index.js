const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // node 中的全局对象是 global
  global.console.log('index2')

   // 1.什么时候能用await?
   // await 的外层函数必须是一个async函数
   // 声明了 async函数，里面可以没有 await
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/testAsync', async(ctx) =>{
  global.console.log('start', new Date().getTime())

    // 2.await 后面跟什么？
    // await 后面跟的是一个 Promise对象（如果不是，也会自动转为Promise对象）

    // 3. await 结果到来之前，代码不会向下运行
    // 4. 变量a的结果就是 resolve()返回的值 ab---->即 Promise对象的值，就是resolve()的参数
    const a = await new Promise((resolve, reject) => {
      setTimeout(function () {
          global.console.log('async a', new Date().getTime())
          resolve('ab')
      },1000)
    })

    // 下面的代码，在 第一个 await 结果到来之前，不会运行
    const b = await 12

    // const b = await Promise.resolve(12)

    const c = await new Promise((resolve, reject) => {
        setTimeout(function () {
            global.console.log('async c', new Date().getTime())
            resolve('abc')
        },2000)
    })
    // 5. 当有多个 await时，代码会依次向下执行
    ctx.body = {
        a, // ab
        b,  // 12
        c // abc
    }
})

module.exports = router
