/* eslint-disable camelcase */
export const state = () => ({
  list: [],
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
      if (data.success) {
        commit('setCurrent', data.user)
        this.$cookies.set('user', state.current)
      }
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  async loadAllByType({ commit }, type) {
    try {
      const response = await this.$axios.get('/user/type', {
        params: { type },
      })
      const data = await response.data
      commit('setList', data.users)
    } catch (error) {
      commit('setError', error)
    }
  },

  async register(
    { commit, dispatch },
    { name, email, password, address, store_id, type }
  ) {
    const payload = { name, email, password, address, store_id, type }
    dispatch('clearError')
    try {
      const response = await this.$axios.post('/auth/register', payload)
      const data = await response.data
      if (data.success) {
        commit('setCurrent', data.user)
      }
    } catch (error) {
      if (error.response.status === 422) {
        commit('setValidation', error.response.data)
        return
      }
      commit('setError', error)
    }
  },

  async add(
    { commit, dispatch },
    { name, email, password, address, store_id, type }
  ) {
    const payload = { name, email, password, address, store_id, type }
    try {
      dispatch('clearError')
      const response = await this.$axios.post('/auth/register', payload)
      const data = await response.data
      if (data.success) await dispatch('loadAllByType')
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
    { id, name, email, password, address, store_id, type }
  ) {
    const payload = { name, email, password, address, store_id, type }
    try {
      dispatch('clearError')
      const response = await this.$axios.put(`/user/${id}`, payload)
      const data = await response.data
      if (data.success) await dispatch('loadAllByType')
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
      dispatch('clearError')
      const response = await this.$axios.delete(`/user/${id}`)
      const data = await response.data
      if (data.success) await dispatch('loadAllByType')
    } catch (error) {
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
  setList(state, users) {
    state.list = users
  },
}
