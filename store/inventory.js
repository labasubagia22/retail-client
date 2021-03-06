/* eslint-disable camelcase */
export const state = () => ({
  list: [],
  single: null,
  validation: null,
  error: null,
})

export const actions = {
  async loadList({ commit }, { store_id, product_type_id = null }) {
    try {
      const response = await this.$axios.get('/inventory', {
        params: { store_id, product_type_id },
      })
      const data = await response.data
      commit('setList', data.inventories)
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadSingle({ commit }, id) {
    try {
      const response = await this.$axios.get(`/inventory/${id}`)
      const data = await response.data
      commit('setSingle', data.inventory)
    } catch (error) {
      commit('setError', error)
    }
  },

  async create(
    { commit, dispatch, rootState },
    { stock, price, store_id, product_id, vendor_id }
  ) {
    try {
      const payload = { stock, price, store_id, product_id, vendor_id }
      const response = await this.$axios.post(`/inventory`, payload)
      const data = await response.data
      if (data.success) {
        await dispatch('loadList', {
          store_id: rootState.user.current.store_id,
        })
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

  async update(
    { commit, dispatch, rootState },
    { id, stock, price, store_id, product_id, vendor_id }
  ) {
    try {
      const payload = { stock, price, store_id, product_id, vendor_id }
      const response = await this.$axios.put(`/inventory/${id}`, payload)
      const data = await response.data
      if (data.success) {
        await dispatch('loadList', {
          store_id: rootState.user.current.store_id,
        })
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

  async delete({ commit, dispatch, rootState }, id) {
    try {
      const response = await this.$axios.delete(`/inventory/${id}`)
      const data = await response.data
      if (data.success) {
        await dispatch('loadList', {
          store_id: rootState.user.current.store_id,
        })
        dispatch('clearError')
      }
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
  setSingle(state, inventory) {
    state.single = inventory
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
