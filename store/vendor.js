/* eslint-disable camelcase */
export const state = () => ({
  list: [],
  single: null,
  validation: null,
  error: null,
})

export const actions = {
  async loadList({ commit }) {
    try {
      const response = await this.$axios.get('/vendor')
      const data = await response.data
      commit('setList', data.vendors)
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadSingle({ commit }, id) {
    try {
      const response = await this.$axios.get(`/vendor/${id}`)
      const data = await response.data
      commit('setSingle', data.vendor)
    } catch (error) {
      commit('setError', error)
    }
  },

  async create({ commit, dispatch }, { name, address }) {
    try {
      const response = await this.$axios.post(`/vendor`, { name, address })
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

  async update({ commit, dispatch }, { id, name, address }) {
    try {
      const response = await this.$axios.put(`/vendor/${id}`, { name, address })
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
      const response = await this.$axios.delete(`/vendor/${id}`)
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
  setSingle(state, vendor) {
    state.single = vendor
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
