export const state = () => ({
  list: [],
  single: null,
  validation: null,
  error: null,
})

export const actions = {
  async loadList({ commit }) {
    try {
      const response = await this.$axios.get('/product-type')
      const data = await response.data
      commit('setList', data.product_types)
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadSingle({ commit }, id) {
    try {
      const response = await this.$axios.get(`/product-type/${id}`)
      const data = await response.data
      commit('setSingle', data.product_type)
    } catch (error) {
      commit('setError', error)
    }
  },

  async create({ commit, dispatch }, { name }) {
    try {
      const response = await this.$axios.post(`/product-type`, { name })
      const data = await response.data
      if (data.success) dispatch('loadList')
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  async update({ commit, dispatch }, { id, name }) {
    try {
      const response = await this.$axios.put(`/product-type/${id}`, { name })
      const data = await response.data
      if (data.success) dispatch('loadList')
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  async delete({ commit, dispatch }, id) {
    try {
      const response = await this.$axios.delete(`/product-type/${id}`)
      const data = await response.data
      if (data.success) dispatch('loadList')
    } catch (error) {
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
  setSingle(state, productType) {
    state.single = productType
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
