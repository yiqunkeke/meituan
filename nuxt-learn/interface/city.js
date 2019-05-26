import Router from 'koa-router' // 引入koa路由

const router = new Router({ // 创建koa路由实例---router
    prefix: '/city'
})

// 定义接口
router.get('/list', async (ctx) => {
    ctx.body = {
        list: ['北京', '天津']
    }
})

export default router // 导出实例