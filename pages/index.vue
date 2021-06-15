<template>
  <div>
    <!-- product -->
    <div class="mt-2">
      <h1 class="text-lg">Products</h1>

      <div class="w-full mt-4">
        <p class="text-gray-500 text-sm">Product Type Filter</p>
        <select
          v-model="productTypeId"
          class="px-3 py-2 text-sm rounded bg-white border-2 w-full mt-2"
        >
          <option class="text-sm text-gray-500" value="">All</option>
          <option
            v-for="p in optionProductTypes"
            :key="p.id"
            :value="p.id"
            class="text-sm cursor-pointer"
          >
            {{ p.name }}
          </option>
        </select>
      </div>

      <div class="mt-6 grid grid-cols-4 gap-8">
        <div
          v-for="(v, i) in inventory"
          :key="i"
          class="border-2 shadow-md rounded-md overflow-hidden"
        >
          <img :src="v.product_image" :alt="v.name" class="w-full" />
          <div class="p-4">
            <p class="font-bold">{{ v.product_name }}</p>
            <p>Rp. {{ v.price }}</p>
            <p class="text-sm text-gray-500">Available {{ v.stock }}</p>

            <div class="flex justify-center mt-4">
              <button
                v-show="isAddToCartShow(v)"
                class="text-xs bg-green-400 p-1 px-2 rounded text-white"
                @click="handleAddToCart(v)"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'shop',
  data() {
    return {
      productTypeId: '',
    }
  },
  computed: {
    inventory() {
      return this.$store.state.inventory.list.map((v) => {
        const isAdded = this.cartProducts.find((p) => p.id === v.product_id)
        return {
          ...v,
          is_on_cart: isAdded,
        }
      })
    },
    cartProducts() {
      return this.$store.getters['cart/getCartProducts'](this.selectedStoreId)
    },
    optionProductTypes() {
      return this.$store.state.productType.list
    },
    user() {
      return this.$store.state.user.current
    },
    selectedStoreId() {
      return this.$store.state.store.selectedStoreId
    },
  },
  watch: {
    cartProducts() {
      this.$forceUpdate()
    },
    productTypeId() {
      this.$store.dispatch('inventory/loadList', {
        store_id: this.selectedStoreId,
        product_type_id: this.productTypeId ? this.productTypeId : null,
      })
    },
    selectedStoreId() {
      this.productTypeId = ''
    },
    user() {
      this.productTypeId = ''
    },
  },
  mounted() {
    this.$store.dispatch('productType/loadList')
  },
  methods: {
    isAddToCartShow(inventory) {
      if (!this.user) return false
      if (this.user.type !== 'customer') return false
      if (inventory.stock <= 0) return false
      return !inventory.is_on_cart
    },
    handleAddToCart(inventory) {
      if (inventory.is_on_cart) return
      if (inventory.stock <= 0) return
      this.$store.dispatch('cart/productAdd', {
        id: inventory.product_id,
        amount: 1,
      })
    },
  },
}
</script>
