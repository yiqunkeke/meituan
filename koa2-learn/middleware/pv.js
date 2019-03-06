function pv(ctx) {
    // ctx 对象中包含 request 和 response 两方面信息
    // ctx.session.count++ // 将服务端的session种植到客户端的cookies中去
    // 刷新页面，在Application---Cookies中多出koa.sid和koa.sid.sig
    global.console.log(`pv, ${ctx.path}`)
}

module.exports = function () {
    return async function(ctx, next) {
        pv(ctx)  // 处理的过程
        await next()  // 当前中间件处理完毕，交给下一个中间件
    }
}