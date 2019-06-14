import Router from 'koa-router';
// import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'
import md5 from 'crypto-js/md5'


let router = new Router({ prefix: '/order' })

// 创建订单
router.post('/createOrder', async ctx => {
    let { id, price, count } = ctx.request.body
    let time = Date()
    let orderID = md5(Math.random()*1000 + time).toString()

    // 判断登录状态
    if(!ctx.isAuthenticated()){
        // 未登录-->拦截
        ctx.body = {
            code: -1,
            msg:'please login'
        }
    } else {
        // 登录--> 去数据库，查找购物车
        let findCart = await Cart.findOne({ cartNo: id})
        // 创建订单实例
        let order = new Order({
            id: orderID,
            count,
            total: price * count,
            time,
            user: ctx.session.passport.user,
            name: findCart.detail[0].name,
            imgs: findCart.detail[0].imgs,
            status: 0
        })
        
        try {
            // 写入数据库
            let result = await order.save() 
            if(result) {
                // 写库成功，删除对应的购物车
                await findCart.remove()
                ctx.body = {
                    code: 0,
                    id: orderID
                }
            } else {
                //失败
                ctx.body = {
                    code: -1
                }
            }
        } catch (e) {
            ctx.body = {
                code: -1
            }
        }
    }
})

// 获取订单
router.post('/getOrders', async ctx=>{
    // 判断登录状态
    if(!ctx.isAuthenticated()){
        // 未登录-->拦截
        ctx.body = {
            code: -1,
            list:[],
            msg: 'please login'
        }
    } else {
        // 登录--> 查询订单
        try {
            let result = await Order.find()
            if(result){
                ctx.body = {
                    code: 0,
                    list: result
                }
            } else {
                ctx.body = {
                    code: -1,
                    list: []
                }
            }
        } catch (e) {
            ctx.body = {
                code: -1,
                list: []
            }
        }
    }
})

export default router