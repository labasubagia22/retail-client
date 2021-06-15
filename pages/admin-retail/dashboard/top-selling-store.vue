<template>
  <div>
    <h1>Top Selling Store This Year</h1>
    <table class="table-auto w-full border-collapse border-2 mt-4">
      <thead>
        <tr class="text-left text-sm">
          <th class="border-2 p-2">Name</th>
          <th class="border-2 p-2">Address/Area</th>
          <th class="border-2 p-2">Total</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2">{{ v.address }}</td>
          <td class="border-2 p-2">{{ v.total_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TopStore',
  computed: {
    list() {
      return this.$store.state.query.list
    },
  },
  mounted() {
    this.$store.dispatch('query/loadTopSellingStore', {})
  },
}
</script>
