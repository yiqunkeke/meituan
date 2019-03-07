const state = () => ({
  list: ['a', 'b']
})

const mutations = {
  add(state, text) {
    state.list.push(text)
  }
}

const actions = {
  add: ({commit}, text) => {
    commit('add', text)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
