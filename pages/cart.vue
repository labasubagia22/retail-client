<template>
  <div>
    <form v-if="products.length" @submit.prevent="handleSubmit">
      <table class="table-auto w-full border-collapse border-2 mt-4">
        <thead>
          <tr class="text-left text-sm">
            <th class="border-2 p-2">Product</th>
            <th class="border-2 p-2">Image</th>
            <th class="border-2 p-2">Stock</th>
            <th class="border-2 p-2">Price</th>
            <th class="border-2 p-2 w-2/12">Buy Amount</th>
            <th class="border-2 p-2">Subtotal</th>
            <th class="border-2 p-2">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr v-for="(v, i) in inventory" :key="i">
            <td class="border-2 p-2">{{ v.product_name }}</td>
            <td class="border-2 p-2 flex justify-center">
              <img class="h-20" :src="v.product_image" :alt="v.name" />
            </td>
            <td class="border-2 p-2">{{ v.stock }}</td>
            <td class="border-2 p-2">{{ v.price }}</td>
            <td class="border-2 p-2">
              <input
                class="p-2 px-3 border-4 border-blue-300 w-full rounded"
                type="number"
                min="1"
                :max="v.stock"
                :value="getProductAmount(v.product_id)"
                @input="
                  (event) =>
                    $store.dispatch('cart/productSetAmount', {
                      id: v.product_id,
                      amount: parseInt(event.target.value),
                    })
                "
              />
            </td>
            <td class="border-2 p-2">
              {{ getProductAmount(v.product_id) * v.price }}
            </td>
            <td class="border-2 p-2">
              <button
                type="button"
                class="p-1 px-2 text-xs rounded bg-red-500 text-white"
                @click="$store.dispatch('cart/productRemove', v.product_id)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td colspan="5" class="border-2 p-2 font-bold">Total</td>
            <td class="border-2 p-2 font-bold">{{ total }}</td>
            <td class="border-2 p-2"></td>
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
  middleware: ['auth', 'customer'],
  computed: {
    products() {
      return this.$store.getters['cart/getCartProducts'](this.selectedStoreId)
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
    total() {
      let total = 0
      this.products.forEach((p) => {
        const inventory = this.inventory.find((i) => i.product_id === p.id)
        if (inventory) {
          total += inventory.price * p.amount
        }
      })
      return total
    },
  },
  mounted() {
    this.loadingContainer(async () => {
      await Promise.all([
        this.$store.dispatch('inventory/loadList', {
          store_id: this.selectedStoreId,
        }),
        this.$store.dispatch('cart/initialize'),
      ])
    })
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
    handleSubmit() {
      const isConfirmed = confirm('Process order?')
      if (!isConfirmed) return
      this.loadingContainer(async () => {
        await this.$store.dispatch('order/create', {
          products: this.products,
          store_id: this.selectedStoreId,
        })
        await this.refresh()
      })
    },
    refresh() {
      this.loadingContainer(async () => {
        await Promise.all([
          this.$store.dispatch('cart/productClear'),
          this.$store.dispatch('inventory/loadList', {
            store_id: this.selectedStoreId,
          }),
        ])
      })
    },
  },
}
</script>
