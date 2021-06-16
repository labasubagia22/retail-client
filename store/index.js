export const state = () => ({
  isLoading: false,
})

export const mutations = {
  setLoading(state, val) {
    state.isLoading = val
  },
}
