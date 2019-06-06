import Router from 'koa-router'
import axios from './utils/axios'

// 下面开始定义接口
let router = new Router({
    prefix: "/geo" // 所有这个文件下的接口，都添加geo前缀
})

const sign = "abcd";

router.get('/getPositon', async (ctx) => {
    let {status, data:{province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if(status===200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province:'',
            city:''
        }
    }
})

export default router;