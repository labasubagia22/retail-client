/* eslint-disable camelcase */
export const state = () => ({
  current: null,
  validation: null,
  error: null,
})

export const actions = {
  async login({ commit, state, dispatch }, { email, password }) {
    const payload = { email, password }
    dispatch('clearError')
    try {
      const response = await this.$axios.post('/auth/login', payload)
      const data = await response.data
      commit('setCurrent', data.user)
      this.$cookies.set('user', state.current)
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  async register(
    { commit, state, dispatch },
    { name, email, password, address, store_id, type }
  ) {
    const payload = { name, email, password, address, store_id, type }
    dispatch('clearError')
    try {
      const response = await this.$axios.post('/auth/register', payload)
      const data = await response.data
      commit('setCurrent', data.user)
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  loadCurrent({ commit, dispatch }) {
    dispatch('clearError')
    const user = this.$cookies.get('user')
    if (!user) {
      commit('setCurrent', null)
      return
    }
    commit('setCurrent', user)
  },

  logout({ commit }) {
    commit('setCurrent', null)
    this.$cookies.remove('user')
  },

  clearError({ commit }) {
    commit('setValidation', null)
    commit('setError', null)
  },
}

export const mutations = {
  setCurrent(state, user) {
    state.current = user
  },
  setValidation(state, validation) {
    state.validation = validation
  },
  setError(state, error) {
    state.error = error
  },
}
