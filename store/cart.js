export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setProductAmount(state, { id, amount }) {
    state.products = state.products.map((p) => {
      if (p.id !== id) return p
      return { ...p, amount }
    })
  },
  removeProduct(state, id) {
    state.products = state.products.filter((p) => p.id !== id)
  },
}
