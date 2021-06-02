<template>
  <div>
    <h1 class="text-lg mt-2">My Order</h1>

    <table class="table-auto w-full border-collapse border-2 mt-4">
      <thead>
        <tr class="text-left text-sm">
          <th class="border-2 p-2">Order ID</th>
          <!-- <th class="border-2 p-2">Store</th> -->
          <th class="border-2 p-2">Status</th>
          <th class="border-2 px-2">Date</th>
          <th class="border-2 p-2">Total</th>
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.id }}</td>
          <!-- <td class="border-2 p-2">{{ v.store ? v.store.name : '' }}</td> -->
          <td class="border-2 p-2">{{ v.status.split('_').join(' ') }}</td>
          <td class="border-2 p-2">
            {{ $moment(v.created_at).format('DD MMMM YYYY') }}
          </td>
          <td class="border-2 p-2">{{ v.total_price }}</td>
          <td class="border-2 p-2 text-center flex justify-center">
            <nuxt-link
              class="p-1 px-3 text-xs rounded bg-blue-500 text-white mr-2"
              :to="`/order/${v.id}`"
              >Detail</nuxt-link
            >
            <div v-if="v.status === 'wait_delivery'">
              <button
                class="p-1 px-3 text-xs rounded bg-green-400 text-white mr-1"
                @click="handleDone(v.id)"
              >
                Done
              </button>
              <button
                class="p-1 px-3 text-xs rounded bg-red-400 text-white"
                @click="handleCancel(v.id)"
              >
                Cancel
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Order',
  layout: 'shop',
  middleware: ['auth', 'customer'],
  computed: {
    list() {
      return this.$store.state.order.list.filter(
        (v) => v.store_id === this.selectedStoreId
      )
    },
    validation() {
      return this.$store.state.order.validation
    },
    error() {
      return this.$store.state.order.error
    },
    user() {
      return this.$store.state.user.current
    },
    selectedStoreId() {
      return this.$store.state.store.selectedStoreId
    },
  },
  created() {
    this.$store.dispatch('order/loadList')
  },
  methods: {
    async handleDone(id) {
      const isConfirmed = confirm('Set this order as finished?')
      if (!isConfirmed) return
      const payload = { id, status: 'finished' }
      await this.$store.dispatch('order/updateStatus', payload)
      this.refresh()
    },

    async handleCancel(id) {
      const isConfirmed = confirm('Cancel this order?')
      if (!isConfirmed) return
      const payload = { id, status: 'cancelled' }
      await this.$store.dispatch('order/updateStatus', payload)
      this.refresh()
    },

    refresh() {
      this.$store.dispatch('order/loadList')
      this.$store.dispatch('inventory/loadList', {
        store_id: this.selectedStoreId,
      })
    },
  },
}
</script>
