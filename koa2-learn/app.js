const Koa = require('koa') // 引入核心包
const app = new Koa() // 创建koa实例 app
const views = require('koa-views')  // koa 中间件 middleware
const json = require('koa-json')   // koa 中间件
const onerror = require('koa-onerror') // koa 中间件
const bodyparser = require('koa-bodyparser')// koa 中间件
const logger = require('koa-logger')// koa 中间件
const pv = require('./middleware/pv')
const m1 = require('./middleware/m1')
const m2 = require('./middleware/m2')
const m3 = require('./middleware/m3')

const mongoose = require('mongoose')  // 引入mongoose包
const dbConfig = require('./dbs/config')  // 引入数据库配置文件


const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares----app.use()引用中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(pv())
app.use(m1())
app.use(m2())
app.use(m3())
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
}) // 把koa服务与数据库服务进行连接

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

/** 中间件原理：
 *  koa 框架---是服务端框架----服务端应用程序----接收浏览器发出的应用请求----中间件----响应请求
*
 *   洋葱图
 *   1.顺序：
 *    中间件的引用顺序跟代码顺序可以不一致
 *   middleware 目录下-----有中间件实例
* */
