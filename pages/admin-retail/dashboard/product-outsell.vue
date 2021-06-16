<template>
  <div>
    <h1>Check First Product Outsell Second Product</h1>

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
        <p class="mr-2 text-xs font-bold">First Product</p>
        <select
          v-model="product1"
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
      <div class="text-sm items-center mt-4">
        <p class="text-xs font-bold mr-2">Second Product</p>
        <select
          v-model="product2"
          class="px-3 py-2 mt-1 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select Product 2
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
          <th class="border-2 p-2">Address/Area</th>
          <th class="border-2 p2">{{ product1 ? product1.name : 'N/A' }}</th>
          <th class="border-2 p2">{{ product2 ? product2.name : 'N/A' }}</th>
          <th class="border-2 p-2">Is Outsell</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2">{{ v.address }}</td>
          <td class="border-2 p-2">{{ v.p1_sell }}</td>
          <td class="border-2 p-2">{{ v.p2_sell }}</td>
          <td class="border-2 p-2">{{ v.is_outsell ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>

    <p class="mt-5 text-sm">
      Total Store Where
      {{ product1 ? product1.name : 'N/A' }}
      Outsell
      {{ product2 ? product2.name : 'N/A' }}
      is
      {{ outsellCount }}
    </p>
  </div>
</template>

<script>
import faker from 'faker'

export default {
  name: 'TopStore',
  data() {
    return {
      product1: null,
      product2: null,
    }
  },
  computed: {
    list() {
      return this.$store.state.query.list
    },
    outsellCount() {
      return this.list.filter((s) => s.is_outsell).length
    },
    products() {
      return this.$store.state.product.list
    },
  },
  watch: {
    product1() {
      this.handleCompareProducts()
    },
    product2() {
      this.handleCompareProducts()
    },
  },
  mounted() {
    this.loadingContainer(async () => {
      await this.$store.dispatch('product/loadList')
      if (this.products.length) {
        this.product1 = faker.random.arrayElement(this.products)
        this.product2 = faker.random.arrayElement(this.products)
      }
    })
  },
  methods: {
    handleCompareProducts() {
      this.loadingContainer(async () => {
        await this.$store.dispatch('query/loadCompareOutsellTwoProduct', {
          product_id_1: this.product1.id,
          product_id_2: this.product2.id,
        })
      })
    },
  },
}
</script>
