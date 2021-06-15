/* eslint-disable camelcase */
export const state = () => ({
  list: [],
  error: null,
})

export const actions = {
  async loadTopProductSell(
    { commit },
    { store_id, address, sort_by = 'amount', limit = 20 }
  ) {
    try {
      const response = await this.$axios.get('/query/top-selling-product', {
        params: { store_id, address, sort_by, limit },
      })
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
  setError(state, error) {
    state.error = error
  },
}
