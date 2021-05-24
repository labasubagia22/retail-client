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
      const response = await this.$axios.get('/store')
      const data = await response.data
      commit('setList', data.stores)
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadSingle({ commit }, id) {
    try {
      const response = await this.$axios.get(`/store/${id}`)
      const data = await response.data
      commit('setSingle', data.store)
    } catch (error) {
      commit('setError', error)
    }
  },

  async create({ commit, dispatch }, { name, address }) {
    try {
      const response = await this.$axios.post(`/store`, { name, address })
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
      const response = await this.$axios.put(`/store/${id}`, { name, address })
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
      const response = await this.$axios.delete(`/store/${id}`)
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
  setSingle(state, store) {
    state.single = store
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
