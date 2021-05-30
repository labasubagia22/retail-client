/* eslint-disable camelcase */
export const state = () => ({
  products: [],
  list: [],
})

export const getters = {
  getCart: (state) => (storeId) => {
    return state.list.find((v) => v.store_id === storeId)
  },
  getCartProducts: (state) => (storeId) => {
    const cart = state.list.find((v) => v.store_id === storeId)
    if (!cart) return []
    return cart.products
  },
}

export const actions = {
  initialize({ commit, rootState, state }) {
    if (state.list.length) return

    const stores = rootState.store.list
    if (!stores.length) return

    commit(
      'setList',
      stores.map((v) => ({ store_id: v.id, products: [] }))
    )
  },

  productAdd({ commit, rootState, getters, dispatch }, { id, amount }) {
    dispatch('initialize')

    const storeId = rootState.store.selectedStoreId
    let cart = getters.getCart(storeId)
    if (!cart) {
      cart = { store_id: storeId, products: [] }
    }

    const isExist = cart.products.find((v) => v.id === id)
    if (isExist) return

    commit('setListItem', {
      ...cart,
      products: [...cart.products, { id, amount }],
    })
  },

  productRemove({ commit, rootState, getters }, id) {
    const storeId = rootState.store.selectedStoreId
    const cart = getters.getCart(storeId)
    const products = cart.products.filter((p) => p.id !== id)
    commit('setListItem', { ...cart, products })
  },

  productSetAmount({ commit, getters, rootState }, { id, amount }) {
    const storeId = rootState.store.selectedStoreId
    const cart = getters.getCart(storeId)
    const products = cart.products.map((p) => {
      if (p.id !== id) return p
      return { ...p, amount }
    })
    commit('setListItem', { ...cart, products })
  },

  productClear({ commit, getters, rootState }) {
    const storeId = rootState.store.selectedStoreId
    const cart = getters.getCart(storeId)
    commit('setListItem', { ...cart, products: [] })
  },

  cartClear({ commit, dispatch }) {
    commit('setList', [])
    dispatch('initialize')
  },
}

export const mutations = {
  setList(state, list) {
    state.list = list
  },
  setListItem(state, { store_id, products }) {
    state.list = state.list.map((c) => {
      if (c.store_id !== store_id) return c
      return { ...c, products }
    })
  },
}
