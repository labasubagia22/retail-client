<template>
  <div>
    <!-- product -->
    <div class="mt-2">
      <h1 class="text-lg">Products</h1>
      <div class="mt-4 grid grid-cols-4 gap-8">
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
  computed: {
    inventory() {
      return this.$store.state.inventory.list.map((v) => {
        const isAdded = this.$store.state.cart.products.find(
          (p) => p.id === v.product_id
        )
        return {
          ...v,
          is_on_cart: isAdded,
        }
      })
    },
    user() {
      return this.$store.state.user.current
    },
    cartProducts() {
      return this.$store.state.cart.products
    },
  },
  watch: {
    cartProducts() {
      this.$forceUpdate()
    },
  },
  methods: {
    isAddToCartShow(inventory) {
      if (!this.user) return false
      if (this.user.type !== 'customer') return false
      if (inventory.stock <= 0) return false
      return !inventory.is_on_cart
    },
    handleLogout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    handleAddToCart(inventory) {
      if (inventory.is_on_cart) return
      if (inventory.stock <= 0) return
      this.$store.commit('cart/setProducts', [
        ...this.cartProducts,
        { id: inventory.product_id, amount: 1 },
      ])
    },
  },
}
</script>
