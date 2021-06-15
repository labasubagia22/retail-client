<template>
  <div>
    <section class="flex">
      <button
        v-if="optionProduct.length"
        class="bg-green-500 p-1 px-3 rounded text-white"
        @click="handleAdd"
      >
        Add
      </button>
    </section>

    <form
      v-if="isFormOpen"
      class="bg-gray-100 border mt-4 flex flex-col p-3 w-3/12 rounded"
      @submit.prevent="handleSave"
    >
      <p class="text-center">{{ form.id ? 'Edit' : 'Add New' }} Inventory</p>

      <p v-if="error" class="text-xs text-center text-red-500 mt-1">
        {{ error.response.data.error }}
      </p>

      <div class="mt-4">
        <!-- Stock -->
        <input
          v-model="form.stock"
          class="px-3 py-1 border-2 text-sm rounded w-full"
          type="number"
          placeholder="Stock"
          required
        />
        <span
          v-if="validation && validation.stock"
          class="text-xs text-red-500 mt-1"
          >{{ validation.stock.join() }}</span
        >

        <!-- Price -->
        <input
          v-model="form.price"
          class="px-3 py-1 border-2 text-sm rounded w-full mt-4"
          type="number"
          placeholder="Price"
          required
        />
        <span
          v-if="validation && validation.price"
          class="text-xs text-red-500 mt-1"
          >{{ validation.price.join() }}</span
        >

        <!-- product -->
        <div class="w-full mt-4">
          <select
            v-model="form.product_id"
            class="px-3 py-2 text-sm rounded bg-white border-2 w-full"
            required
          >
            <option class="text-sm text-gray-500" disabled value="">
              Select Product
            </option>
            <option
              v-for="v in optionProduct"
              :key="v.id"
              :value="v.id"
              class="text-sm cursor-pointer"
            >
              {{ v.name }}
            </option>
          </select>
          <span
            v-if="validation && validation.product_id"
            class="text-xs text-red-500 mt-1"
            >{{ validation.product_id.join() }}</span
          >
        </div>
      </div>

      <!-- vendor -->
      <div class="w-full mt-4">
        <select
          v-model="form.vendor_id"
          class="px-3 py-2 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select Vendor
          </option>
          <option
            v-for="v in optionVendor"
            :key="v.id"
            :value="v.id"
            class="text-sm cursor-pointer"
          >
            {{ v.name }}
          </option>
        </select>
        <span
          v-if="validation && validation.vendor_id"
          class="text-xs text-red-500 mt-1"
          >{{ validation.vendor_id.join() }}</span
        >
      </div>

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
          <th class="border-2 p-2">Name</th>
          <th class="border-2 p-2">Image</th>
          <th class="border-2 p-2">Barcode</th>
          <th class="border-2 p-2">Brand</th>
          <th class="border-2 p-2">Type</th>
          <th class="border-2 p-2">Vendor</th>
          <th class="border-2 p-2">Stock</th>
          <th class="border-2 p-2">Price</th>
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.product_name }}</td>
          <td class="border-2 p-2 flex justify-center">
            <img class="h-20" :src="v.product_image" :alt="v.name" />
          </td>
          <td class="border-2 p-2">{{ v.product_barcode }}</td>
          <td class="border-2 p-2">{{ v.brand_name }}</td>
          <td class="border-2 p-2">{{ v.product_type }}</td>
          <td class="border-2 p-2">{{ v.vendor_name }}</td>
          <td class="border-2 p-2">{{ v.stock }}</td>
          <td class="border-2 p-2">Rp. {{ v.price }}</td>
          <td class="border-2 p-2 text-center">
            <button
              class="p-1 px-3 text-xs rounded bg-yellow-500"
              @click="handleEdit(v)"
            >
              Edit
            </button>
            <button
              class="p-1 px-3 text-xs rounded bg-red-500 text-white"
              @click="handleDelete(v.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Product',
  data() {
    return {
      form: {
        id: null,
        stock: null,
        price: null,
        product_id: '',
        vendor_id: '',
      },
      isFormOpen: false,
      isLoading: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.inventory.list
    },
    validation() {
      return this.$store.state.inventory.validation
    },
    error() {
      return this.$store.state.inventory.error
    },
    optionProduct() {
      const addedIds = this.list.map((v) => v.product_id)
      return this.$store.state.product.list.filter(
        (v) => !addedIds.includes(v.id)
      )
    },
    optionVendor() {
      return this.$store.state.vendor.list
    },
    user() {
      return this.$store.state.user.current
    },
  },
  mounted() {
    this.$store.dispatch('inventory/loadList', { store_id: this.user.store_id })
    this.$store.dispatch('product/loadList')
    this.$store.dispatch('vendor/loadList')
  },
  methods: {
    handleDelete(id) {
      this.$store.dispatch('inventory/delete', id)
    },
    handleEdit(v) {
      this.clearForm()
      this.isFormOpen = true
      this.form = {
        id: v.id,
        stock: v.stock,
        price: v.price,
        product_id: v.product_id,
        vendor_id: v.vendor_id,
      }
    },
    handleAdd() {
      this.clearForm()
      this.isFormOpen = true
    },
    handleCancel() {
      this.isFormOpen = false
      this.clearForm()
    },
    clearForm() {
      this.$store.dispatch('inventory/clearError')
      this.form = {
        id: null,
        stock: null,
        price: null,
        product_id: '',
        vendor_id: '',
      }
    },
    async handleSave() {
      const payload = { ...this.form, store_id: this.user.store_id }
      if (this.form.id) await this.$store.dispatch('inventory/update', payload)
      else await this.$store.dispatch('inventory/create', payload)
      if (!this.error && !this.validation) {
        this.clearForm()
        this.isFormOpen = false
      }
    },
  },
}
</script>
