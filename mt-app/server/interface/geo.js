import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'
import City from '../dbs/models/city'

let router = new Router({ prefix: '/geo' })

const sign = 'abcd';

// 获取-当前所在城市
router.get('/getPosition', async (ctx) => {
    let {
        status,
        data: {
            province,
            city
        }
    } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
    if (status === 200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})

// 获取-所有省份
router.get('/province', async (ctx) => {
    let province = await Province.find()
    ctx.body = {
      province: province.map(item => {
        return {
          id: item.id,
          name: item.value[0]
        }
      })
    }
    // let { status, data: {
    //     province
    // } } = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
    // ctx.body = {
    //     province: status === 200
    //         ? province
    //         : []
    // }
})

// 获取-某个省份详情
router.get('/province/:id', async (ctx) => {
    let city = await City.findOne({id: ctx.params.id})
    
    ctx.body = {
      code: 0,
      city: city.value.map(item => {
        return {province: item.province, id: item.id, name: item.name}
      })
    }
    // let { status, data: {
    //     city
    // } } = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
    // if (status === 200) {
    //     ctx.body = {
    //         city
    //     }
    // } else {
    //     ctx.body = {
    //         city: []
    //     }
    // }
})

// 获取-所有城市
router.get('/city', async (ctx) => {
    let city = []
    let result = await City.find()
    result.forEach(item => {
      city = city.concat(item.value)
    })
    ctx.body = {
      code: 0,
      city: city.map(item => {
        return {
          province: item.province,
          id: item.id,
          name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
            ? item.province
            : item.name
        }
      })
    }
    // let { status, data: {
    //     city
    // } } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
    // if (status === 200) {
    //     ctx.body = {
    //         city
    //     }
    // } else {
    //     ctx.body = {
    //         city: []
    //     }
    // }
})

// 获取-热门城市
router.get('/hotCity', async (ctx) => {
    let list = [
      '北京市',
      '上海市',
      '广州市',
      '深圳市',
      '天津市',
      '西安市',
      '杭州市',
      '南京市',
      '武汉市',
      '成都市'
    ]
    let result = await City.find()
    let nList = []
    result.forEach(item => {
      nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    })
    ctx.body = {
      hots: nList
    }
    // let { status, data: {
    //     hots
    // } } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
    // if (status === 200) {
    //     ctx.body = {
    //         hots
    //     }
    // } else {
    //     ctx.body = {
    //         hots: []
    //     }
    // }
})

// 获取-首页-菜单数据
router.get('/menu', async (ctx) => {
    const result = await Menu.findOne()
    ctx.body = {
      menu: result.menu
    }
    // let { status, data: {
    //     menu
    // } } = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
    // if (status === 200) {
    //     ctx.body = {
    //         menu
    //     }
    // } else {
    //     ctx.body = {
    //         menu: []
    //     }
    // }
})

export default router;
