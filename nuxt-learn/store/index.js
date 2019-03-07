import Vue from 'vue'
import Vuex from 'vuex'
import city from './modules/city'
import navbar from './modules/navbar'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    city,
    navbar
  },
  actions: {
      // nuxtServerInit({commit}, {req}) {
      //   if (req.session.user) {
      //     commit('city', req.session.user)
      //   }
      // }
  }
})

export default store
