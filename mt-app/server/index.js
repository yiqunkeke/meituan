import Koa from 'Koa'
// const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser' // 处理与post请求相关的包，非常重要
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json' // 对处理服务端返回的json，进行美化操作
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'

const app = new Koa()

// 配置存储session
app.keys = ['mt','keyskeys']
app.proxy = true
app.use(session({
  key:'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))
// 配置post请求的处理
app.use(bodyParser({
  extendTypes: ['json','form','text']
}))
app.use(json())
// 配置 连接数据库--->官方固定写法
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true 
})
// 配置 passport，处理登录相关
app.use(passport.initialize())
app.use(passport.session())


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 配置路由
  app.use(users.routes()).use(users.allowedMethods()) // 固定写法，且固定位置
  app.use(geo.routes()).use(geo.allowedMethods()) // 固定写法，且固定位置

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
