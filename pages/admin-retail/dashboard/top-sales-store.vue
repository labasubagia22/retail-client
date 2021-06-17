<template>
  <div>
    <h1>Top Product Sales in a Store</h1>

    <div
      class="
        my-4
        p-4
        bg-gray-100
        w-3/12
        rounded
        border-2
        flex flex-col
        justify-center
      "
    >
      <div class="text-sm items-center">
        <p class="mr-2 text-xs font-bold">Store</p>
        <select
          v-model="storeId"
          class="px-3 py-2 mt-1 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select Store
          </option>
          <option
            v-for="v in stores"
            :key="v.id"
            :value="v.id"
            class="text-sm cursor-pointer"
          >
            {{ v.name }}
          </option>
        </select>
      </div>
    </div>

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
import faker from 'faker'

export default {
  name: 'TopProductSalesByStore',
  data() {
    return { storeId: '' }
  },
  computed: {
    stores() {
      return this.$store.state.store.list
    },
    list() {
      return this.$store.state.query.list
    },
    user() {
      return this.$store.state.user.current
    },
  },
  watch: {
    storeId() {
      this.handleStoreChange()
    },
  },
  mounted() {
    if (this.storeId) this.handleStoreChange()
    this.loadingContainer(async () => {
      await this.$store.dispatch('store/loadList')
      if (this.storeId) return
      if (this.stores.length <= 0) return
      this.storeId = faker.random.arrayElement(this.stores).id
    })
  },
  methods: {
    handleStoreChange() {
      this.loadingContainer(async () => {
        await this.$store.dispatch('query/loadTopProductSell', {
          store_id: this.storeId,
        })
      })
    },
  },
}
</script>
