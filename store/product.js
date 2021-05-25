/* eslint-disable camelcase */
import { objToFormData } from '../helpers'

export const state = () => ({
  list: [],
  single: null,
  validation: null,
  error: null,
})

export const actions = {
  async loadList({ commit }) {
    try {
      const response = await this.$axios.get('/product')
      const data = await response.data
      commit('setList', data.products)
    } catch (error) {
      commit('setError', error)
    }
  },

  async loadSingle({ commit }, id) {
    try {
      const response = await this.$axios.get(`/product/${id}`)
      const data = await response.data
      commit('setSingle', data.product)
    } catch (error) {
      commit('setError', error)
    }
  },

  async create(
    { commit, dispatch },
    { name, barcode, image, product_type_id, brand_id }
  ) {
    try {
      const payload = { name, barcode, image, product_type_id, brand_id }
      const fd = objToFormData(payload)
      const response = await this.$axios.post(`/product`, fd)
      const data = await response.data
      if (data.success) {
        dispatch('loadList')
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
    { commit, dispatch },
    { id, name, barcode, image, product_type_id, brand_id }
  ) {
    try {
      const payload = { name, barcode, image, product_type_id, brand_id }
      const fd = objToFormData(payload)
      const response = await this.$axios.post(`/product/${id}`, fd)
      const data = await response.data
      if (data.success) {
        dispatch('loadList')
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

  async delete({ commit, dispatch }, id) {
    try {
      const response = await this.$axios.delete(`/product/${id}`)
      const data = await response.data
      if (data.success) {
        dispatch('loadList')
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
  setSingle(state, product) {
    state.single = product
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
