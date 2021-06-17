export const state = () => ({
  list: [],
  error: null,
})

export const actions = {
  async loadList({ commit }) {
    try {
      const response = await this.$axios.get('/store-locations')
      const data = await response.data
      commit('setList', data)
    } catch (error) {
      commit('setError', error)
    }
  },

  clearError({ commit }) {
    commit('setError', null)
  },
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },
}
