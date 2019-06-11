const state = () => ({
   position: { } 
})

const mutations = {
    setPosition(state, value) {
        // console.log(value);
        state.position = value
    }
}
const actions = {
    setPosition({ commit }, value) {
        commit('setPosition', value)
    }
}

export default { namespaced: true, state, mutations, actions}