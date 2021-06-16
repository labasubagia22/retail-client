<template>
  <div>
    <section class="flex">
      <nuxt-link class="bg-gray-400 p-1 px-3 rounded text-white" to="/order">
        Back
      </nuxt-link>
    </section>

    <h1 class="mt-4">Items</h1>
    <table class="table-auto w-full border-collapse border-2 mt-2">
      <thead>
        <tr class="text-left text-sm">
          <th class="border-2 p-2">Product</th>
          <th class="border-2 p-2">Image</th>
          <th class="border-2 p-2">Brand</th>
          <th class="border-2 p-2">Price</th>
          <th class="border-2 p-2">Quantity</th>
          <th class="border-2 p-2">Subtotal</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in order.items" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2 flex justify-center">
            <img class="h-20" :src="v.product_image" :alt="v.name" />
          </td>
          <td class="border-2 p-2">{{ v.brand_name }}</td>
          <td class="border-2 p-2">{{ v.at_time_price }}</td>
          <td class="border-2 p-2">{{ v.amount }}</td>
          <td class="border-2 p-2">{{ v.subtotal_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'OrderDetail',
  layout: 'shop',
  middleware: ['auth', 'customer'],
  computed: {
    order() {
      return this.$store.state.order.single
    },
    user() {
      return this.$store.state.user.current
    },
    selectedStoreId() {
      return this.$store.state.store.selectedStoreId
    },
  },
  mounted() {
    this.loadingContainer(async () => {
      await Promise.all([
        this.$store.dispatch('order/loadSingle', this.$route.params.id),
        this.$store.dispatch('inventory/loadList', {
          store_id: this.selectedStoreId,
        }),
      ])
    })
  },
}
</script>
