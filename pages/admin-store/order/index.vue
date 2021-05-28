<template>
  <div>
    <section class="flex">
      <button
        class="bg-green-500 p-1 px-3 rounded text-white"
        @click="handleAdd"
      >
        Add
      </button>
    </section>

    <form
      v-if="isFormOpen"
      class="bg-gray-100 border mt-4 flex flex-col p-3 w-4/12 rounded"
      @submit.prevent="handleSave"
    >
      <p class="text-center">{{ form.id ? 'Edit' : 'Add New' }} Order</p>

      <p v-if="error" class="text-xs text-center text-red-500 mt-1">
        {{ error.response.data.error }}
      </p>

      <p
        v-if="validation && validation.products"
        class="text-xs text-red-500 mt-1 text-center"
      >
        {{ validation.products.join() }}
      </p>

      <div v-if="form.products.length" class="mt-4">
        <div v-for="(v, i) in form.products" :key="i" class="w-full mt-2 flex">
          <select
            v-model="v.id"
            class="px-3 py-2 text-sm rounded bg-white border-2 w-4/6 mr-2"
            required
          >
            <option class="text-sm text-gray-500" disabled value="">
              Select Product
            </option>
            <option
              v-for="p in optionInventory"
              v-show="!form.products.find((c) => c.id === p.product_id)"
              :key="p.product_id"
              :value="p.product_id"
              class="text-sm cursor-pointer"
            >
              {{ p.product_name }}
            </option>
          </select>

          <input
            v-model="v.amount"
            class="w-1/6 mr-2 bg-white border-2"
            type="number"
            min="1"
            placeholder="Qty"
          />

          <button
            class="p-1 px-3 text-white rounded bg-red-500 text-xs"
            @click="handleRemoveProduct(i)"
          >
            Delete
          </button>
        </div>
      </div>

      <button
        v-if="form.products.length < optionInventory.length"
        type="button"
        class="w-full p-1 px-3 bg-green-500 text-white rounded text-sm mt-4"
        @click="handleAddMoreProduct"
      >
        Add Product
      </button>

      <div class="flex justify-center text-sm text-white mt-4">
        <button
          type="button"
          class="bg-red-500 p-1 px-3 rounded mr-2"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button class="bg-blue-500 p-1 px-3 rounded" :disabled="isLoading">
          Save
        </button>
      </div>
    </form>

    <table class="table-auto w-full border-collapse border-2 mt-4">
      <thead>
        <tr class="text-left text-sm">
          <th class="border-2 p-2">Order ID</th>
          <th class="border-2 p-2">Customer</th>
          <th class="border-2 p-2">Status</th>
          <th class="border-2 p-2">Order Type</th>
          <th class="border-2 p-2">Total</th>
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.id }}</td>
          <td class="border-2 p-2">
            {{ v.customer ? v.customer.email : 'N/A' }}
          </td>
          <td class="border-2 p-2">{{ v.status.split('_').join(' ') }}</td>
          <td class="border-2 p-2">
            {{ v.customer_id == v.created_by ? 'Online' : 'Offline' }}
          </td>
          <td class="border-2 p-2">{{ v.total_price }}</td>
          <td class="border-2 p-2 text-center flex justify-center">
            <nuxt-link
              class="p-1 px-3 text-xs rounded bg-blue-500 text-white mr-2"
              :to="`/admin-store/order/${v.id}`"
              >Detail</nuxt-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Order',
  data() {
    return {
      form: {
        products: [],
      },
      isFormOpen: false,
      isLoading: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.order.list
    },
    validation() {
      return this.$store.state.order.validation
    },
    error() {
      return this.$store.state.order.error
    },
    optionInventory() {
      return this.$store.state.inventory.list.filter((v) => v.stock)
    },
    user() {
      return this.$store.state.user.current
    },
  },
  created() {
    this.$store.dispatch('inventory/loadList', this.user.store_id)
    this.$store.dispatch('order/loadList')
  },
  methods: {
    handleAdd() {
      this.clearForm()
      this.isFormOpen = true
    },
    handleAddMoreProduct() {
      this.form.products.push({ id: '', amount: 1 })
    },
    handleRemoveProduct(index) {
      this.form.products = this.form.products.filter((_, i) => i !== index)
    },
    handleCancel() {
      this.isFormOpen = false
      this.clearForm()
    },
    clearForm() {
      this.$store.dispatch('order/clearError')
      this.form = {
        products: [],
      }
    },
    async handleSave() {
      const payload = { ...this.form, store_id: this.user.store_id }
      await this.$store.dispatch('order/create', payload)
      if (!this.error && !this.validation) {
        this.clearForm()
        this.isFormOpen = false
      }
    },
  },
}
</script>
