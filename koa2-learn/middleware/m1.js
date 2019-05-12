function m1(ctx) {
    // ctx 对象中包含 request 和 response 两方面信息
    global.console.log(`m1`)
}

// 为什么要导出的是一个函数？
// 因为我们在使用的时候，是这样： app.use(m1())
// m1是一个函数，所以这里导出也需要是一个函数。
// 且，这个函数中，必须返回一个异步函数
module.exports = function () {
    return async function(ctx, next) {
        global.console.log(`m1 start`);
        m1(ctx);  // 处理的过程
        await next();  // 当前中间件处理完毕，交给下一个中间件
        global.console.log(`m1 end`);
    }
}