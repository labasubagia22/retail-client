<template>
  <div>
    <h1>Top Product Sales in This Store</h1>
    <table class="table-auto w-full border-collapse border-2 mt-4">
      <thead>
        <tr class="text-left text-sm">
          <th class="border-2 p-2">Name</th>
          <th class="border-2 p-2">Image</th>
          <th class="border-2 p-2">Amount</th>
          <th class="border-2 p-2">Total</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2 flex justify-center">
            <img class="h-20" :src="v.image_url" :alt="v.name" />
          </td>
          <td class="border-2 p-2">{{ v.amount }}</td>
          <td class="border-2 p-2">{{ v.subtotal_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TopSales',
  computed: {
    list() {
      return this.$store.state.query.list
    },
    user() {
      return this.$store.state.user.current
    },
  },
  mounted() {
    this.loadingContainer(async () => {
      await this.$store.dispatch('query/loadTopProductSell', {
        store_id: this.user.store_id,
      })
    })
  },
}
</script>
