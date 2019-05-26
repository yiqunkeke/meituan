import Vue from 'vue'
import Vuex from "vuex"
import city from './modules/city'
import navbar from './modules/navbar'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        city,
        navbar
    },
    actions: {
        // nuxtServerInit() 方法
        // Nuxt.js 会以上下文对象作为参数，调用一个特别的方法，叫做 nuxtServerInit。
        // 所以当应用完毕时，一些我们从服务器获取到的数据就会被填充到这个状态树 (store) 上。
        // 在 store / index.js 文件中，我们添加这个 nuxtServerInit 方法：
        
        // nuxtServerInit({ commit }, { req }) {
        //     if (req.session && req.session.authUser) {
        //         commit('city', req.session.authUser)
        //     }
        // }
    }
})

export default store
