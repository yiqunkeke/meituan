import Vue from 'vue'
import Vuex from 'vuex'
// import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        // geo,
        home
    },
    actions: {
        async nuxtServerInit({commit}, {req, app}) {
            // const { status, data: {province, city}} = await app.$axios.get('geo/getPosition')
            // commit('geo/setPosition', status === 200 ? { province, city} : {province:'1', city:'2'})

            // 设置首页--菜单数据
            const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
            commit('home/setMenu', status2 === 200 ? menu:[])

            // 设置首页--搜索框--热门搜索
            const {status: status3, data: { result }} = await app.$axios.get('search/hotPlace', {
                params:{
                    city: '三亚'
                }
            })
            // console.log(result);
            commit('home/setHotPlace', status3===200 ? result: [])
        }
    }
})

export default store