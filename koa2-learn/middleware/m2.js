function m2(ctx) {
    // ctx 对象中包含 request 和 response 两方面信息
    global.console.log(`m2`)
}

module.exports = function () {
    return async function(ctx, next) {
        global.console.log(`m2 start`)
        m2(ctx)  // 处理的过程
        await next()  // 当前中间件处理完毕，交给下一个中间件
        global.console.log(`m2 end`)
    }
}