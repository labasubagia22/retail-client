/* eslint-disable camelcase */
export const state = () => ({
  list: [],
  single: { items: [] },
  validation: null,
  error: null,
})

export const actions = {
  async loadList({ commit }) {
    try {
      const response = await this.$axios.get('/order')
      const data = await response.data
      commit('setList', data.orders)
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadSingle({ commit }, id) {
    try {
      const response = await this.$axios.get(`/order/${id}`)
      const data = await response.data
      commit('setSingle', data.order)
    } catch (error) {
      commit('setError', error)
    }
  },

  async create({ commit, dispatch }, { products, store_id, customer_id }) {
    try {
      const response = await this.$axios.post(`/order`, {
        products,
        store_id,
        customer_id,
      })
      const data = await response.data
      if (data.success) {
        await dispatch('loadList')
        dispatch('clearError')
      }
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  async updateStatus({ commit, dispatch }, { id, status }) {
    try {
      const response = await this.$axios.post(`/order/${id}/status`, { status })
      const data = await response.data
      if (data.success) {
        await dispatch('loadList')
        dispatch('clearError')
      }
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  clearError({ commit }) {
    commit('setValidation', null)
    commit('setError', null)
  },
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setSingle(state, order) {
    state.single = order
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
