import Router from 'koa-router';
// import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({ prefix: '/cart' })

// 创建购物车，并返回购物车相关信息
router.post('/create', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: 'please login'
        }
    } else {
        let time = Date()

        // 创建购物车id
        let cartNo = md5(Math.random() * 1000 + time).toString()

        let {
            params: {
                id,
                detail
            }
        } = ctx.request.body // post方式，参数在 ctx.request.body中。get方式，参数在 ctx.query中

        // 创建购物车
        let cart = new Cart({ id, cartNo, time, user: ctx.session.passport.user, detail }) 

        // 写入数据库
        let result = await cart.save()

        // 写库成功
        if (result) {
            ctx.body = {
                code: 0,
                msg: '',
                id: cartNo // 返回购物车id
            }
        } else {
            // 失败
            ctx.body = {
                code: -1,
                msg: 'fail'
            }
        }
    }
})

// 获取购物车信息
router.post('/getCart', async ctx => {
    let { id } = ctx.request.body
    // console.log(id);
    try {
        // 读数据库
        let result = await Cart.findOne({ cartNo: id })
        ctx.body = {
            code: 0,
            data: result
                ? result.detail[0]
                : {}
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            data: {}
        }
    }
})

export default router
