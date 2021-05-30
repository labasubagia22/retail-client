<template>
  <div>
    <form v-if="products.length" @submit.prevent="handleSubmit">
      <table class="table-auto w-full border-collapse border-2 mt-4">
        <thead>
          <tr class="text-left text-sm">
            <th class="border-2 p-2">Store</th>
            <th class="border-2 p-2">Product</th>
            <th class="border-2 p-2">Image</th>
            <th class="border-2 p-2 w-2/12">Quantity</th>
            <th class="border-2 p-2">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="(v, i) in inventory" :key="i">
            <td class="border-2 p-2">{{ store.name }}</td>
            <td class="border-2 p-2">{{ v.product_name }}</td>
            <td class="border-2 p-2 flex justify-center">
              <img class="h-20" :src="v.product_image" :alt="v.name" />
            </td>
            <td class="border-2 p-2">
              <input
                class="p-2 px-3 border-2 rounded"
                type="number"
                min="1"
                :max="v.stock"
                :value="getProductAmount(v.product_id)"
                @input="
                  (event) =>
                    $store.commit('cart/setProductAmount', {
                      id: v.product_id,
                      amount: parseInt(event.target.value),
                    })
                "
              />
            </td>
            <td class="border-2 p-2">
              <button
                type="button"
                class="p-1 px-2 text-xs rounded bg-red-500 text-white"
                @click="$store.commit('cart/removeProduct', v.product_id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="w-full flex justify-end items-center mt-6">
        <button class="p-2 px-3 bg-green-400 text-sm rounded text-white">
          Buy
        </button>
      </div>
    </form>
    <div v-else>
      <h1 class="text-4xl text-gray-300 text-center my-8">Cart Empty</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  layout: 'shop',
  computed: {
    products() {
      return this.$store.state.cart.products
    },
    inventory() {
      return this.$store.state.inventory.list.filter((v) => {
        const isExist = this.products.find((p) => p.id === v.product_id)
        return isExist
      })
    },
    selectedStoreId() {
      return this.$store.state.store.selectedStoreId
    },
    store() {
      return this.$store.state.store.list.find(
        (v) => v.id === this.selectedStoreId
      )
    },
  },
  created() {
    this.$store.dispatch('inventory/loadList', this.selectedStoreId)
  },
  methods: {
    clearForm() {
      this.form = { products: [] }
    },
    getProductAmount(id) {
      const product = this.products.find((v) => v.id === id)
      if (!product) return 1
      return product.amount
    },
    async handleSubmit() {
      const isConfirmed = confirm('Process order?')
      if (!isConfirmed) return
      await this.$store.dispatch('order/create', {
        products: this.products,
        store_id: this.selectedStoreId,
      })
      this.refresh()
    },
    refresh() {
      this.$store.commit('cart/setProducts', [])
      this.$store.dispatch('inventory/loadList', this.selectedStoreId)
    },
  },
}
</script>
