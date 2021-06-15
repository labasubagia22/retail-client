/* eslint-disable camelcase */
export const state = () => ({
  list: [],
  error: null,
})

export const actions = {
  async loadTopProductSell(
    { commit, dispatch },
    { store_id, address, sort_by = 'amount', limit = 20 }
  ) {
    try {
      const response = await this.$axios.get('/query/top-selling-product', {
        params: { store_id, address, sort_by, limit },
      })
      const data = await response.data
      commit('setList', data)
      dispatch('clearError')
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadTopSellingStore({ commit, dispatch }, { year, limit = 5 }) {
    try {
      const response = await this.$axios.get('/query/top-sell-store', {
        params: { year, limit },
      })
      const data = await response.data
      commit('setList', data)
      dispatch('clearError')
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadCompareOutsellTwoProduct(
    { commit, dispatch },
    { product_id_1, product_id_2 }
  ) {
    try {
      const response = await this.$axios.get('/query/outsell-product-store', {
        params: { product_id_1, product_id_2 },
      })
      const data = await response.data
      commit('setList', data)
      dispatch('clearError')
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadTopBuyWithin({ commit, dispatch }, { product_id, limit = 3 }) {
    try {
      const response = await this.$axios.get('/query/top-buy-within-product', {
        params: { product_id },
      })
      const data = await response.data
      commit('setList', data)
      dispatch('clearError')
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
