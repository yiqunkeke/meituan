const state = () => ({
     menu: [],
     hotPlace: [] 
})

const mutations = {
    setMenu(state, value) {
        console.log(value);
        state.menu = value
    },
    setHotPlace(state, value) {
        // console.log(value);
        state.hotPlace = value
    }
}
const actions = {
    setMenu({ commit }, value) {
        commit('setMenu', value)
    },
    setHotPlace({ commit }, value) {
        commit('setHotPlace', value)
    }
}

export default { namespaced: true, state, mutations, actions}