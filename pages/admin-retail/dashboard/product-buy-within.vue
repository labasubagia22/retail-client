<template>
  <div>
    <h1>Products that buy within perticular product</h1>

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
        <p class="mr-2 text-xs font-bold">Product</p>
        <select
          v-model="product"
          class="px-3 py-2 mt-1 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select Product 1
          </option>
          <option
            v-for="v in products"
            :key="v.id"
            :value="v"
            class="text-sm cursor-pointer"
          >
            {{ v.name }}
          </option>
        </select>
      </div>
    </div>

    <h1 class="mt-4">Stores</h1>
    <table class="table-auto w-full border-collapse border-2 mt-2">
      <thead>
        <tr class="text-left text-sm">
          <th class="border-2 p-2">Name</th>
          <th class="border-2 p-2">Image</th>
          <th class="border-2 p-2">Brand</th>
          <th class="border-2 p-2">Type</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2 flex justify-center">
            <img class="h-20" :src="v.image_url" :alt="v.name" />
          </td>
          <td class="border-2 p-2">{{ v.type }}</td>
          <td class="border-2 p-2">{{ v.brand }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import faker from 'faker'

export default {
  name: 'TopStore',
  data() {
    return {
      product: null,
    }
  },
  computed: {
    list() {
      return this.$store.state.query.list
    },
    products() {
      return this.$store.state.product.list
    },
  },
  watch: {
    product() {
      this.handleChangeProduct()
    },
  },
  async mounted() {
    await this.$store.dispatch('product/loadList')
    if (this.products.length) {
      this.product = faker.random.arrayElement(this.products)
    }
  },
  methods: {
    handleChangeProduct() {
      this.$store.dispatch('query/loadTopBuyWithin', {
        product_id: this.product.id,
      })
    },
  },
}
</script>
