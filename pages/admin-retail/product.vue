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
      class="bg-gray-100 border mt-4 flex flex-col p-3 w-3/12 rounded"
      @submit.prevent="handleSave"
    >
      <p class="text-center">{{ form.id ? 'Edit' : 'Add New' }} Product</p>

      <p v-if="error" class="text-xs text-center text-red-500 mt-1">
        {{ error.response.data.error }}
      </p>

      <div class="mt-4">
        <!-- Name -->
        <input
          v-model="form.name"
          class="px-3 py-1 border-2 text-sm rounded w-full"
          type="text"
          placeholder="Name"
          required
        />
        <span
          v-if="validation && validation.name"
          class="text-xs text-red-500 mt-1"
          >{{ validation.name.join() }}</span
        >

        <!-- Barcode -->
        <input
          v-model="form.barcode"
          class="px-3 py-1 border-2 text-sm rounded w-full mt-4"
          type="text"
          placeholder="Barcode"
          required
        />
        <span
          v-if="validation && validation.barcode"
          class="text-xs text-red-500 mt-1"
          >{{ validation.barcode.join() }}</span
        >

        <!-- brand -->
        <div class="w-full mt-4">
          <select
            v-model="form.brand_id"
            class="px-3 py-2 text-sm rounded bg-white border-2 w-full"
            required
          >
            <option class="text-sm text-gray-500" disabled value="">
              Select Brand
            </option>
            <option
              v-for="v in optionBrand"
              :key="v.id"
              :value="v.id"
              class="text-sm cursor-pointer"
            >
              {{ v.name }}
            </option>
          </select>
          <span
            v-if="validation && validation.brand_id"
            class="text-xs text-red-500 mt-1"
            >{{ validation.brand_id.join() }}</span
          >
        </div>
      </div>

      <!-- type -->
      <div class="w-full mt-4">
        <select
          v-model="form.product_type_id"
          class="px-3 py-2 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select Type
          </option>
          <option
            v-for="v in optionType"
            :key="v.id"
            :value="v.id"
            class="text-sm cursor-pointer"
          >
            {{ v.name }}
          </option>
        </select>
        <span
          v-if="validation && validation.product_type_id"
          class="text-xs text-red-500 mt-1"
          >{{ validation.product_type_id.join() }}</span
        >
      </div>

      <!-- Image -->
      <input
        class="px-3 py-1 border-2 text-sm rounded w-full mt-4"
        type="file"
        placeholder="Name"
        @change="handleImageChange"
      />
      <span
        v-if="validation && validation.image"
        class="text-xs text-red-500 mt-1"
        >{{ validation.image.join() }}</span
      >

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
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2 flex justify-center">
            <img class="h-20" :src="v.image_url" :alt="v.name" />
          </td>
          <td class="border-2 p-2">{{ v.barcode }}</td>
          <td class="border-2 p-2">{{ v.brand }}</td>
          <td class="border-2 p-2">{{ v.type }}</td>
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
        name: null,
        barcode: null,
        product_type_id: '',
        brand_id: '',
        image: null,
      },
      isFormOpen: false,
      isLoading: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.product.list
    },
    validation() {
      return this.$store.state.product.validation
    },
    error() {
      return this.$store.state.product.error
    },
    optionType() {
      return this.$store.state.productType.list
    },
    optionBrand() {
      return this.$store.state.brand.list
    },
  },
  mounted() {
    this.$store.dispatch('product/loadList')
    this.$store.dispatch('productType/loadList')
    this.$store.dispatch('brand/loadList')
  },
  methods: {
    handleImageChange(e) {
      const files = e.target.files
      if (!files.length) return
      this.form.image = files[0]
    },
    handleDelete(id) {
      this.$store.dispatch('product/delete', id)
    },
    handleEdit(v) {
      this.clearForm()
      this.isFormOpen = true
      this.form = {
        id: v.id,
        name: v.name,
        barcode: v.barcode,
        product_type_id: v.product_type_id,
        brand_id: v.brand_id,
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
      this.$store.dispatch('product/clearError')
      this.form = {
        id: null,
        name: null,
        barcode: null,
        product_type_id: '',
        brand_id: '',
        image: null,
      }
    },
    async handleSave() {
      if (this.form.id) await this.$store.dispatch('product/update', this.form)
      else await this.$store.dispatch('product/create', this.form)
      if (!this.error && !this.validation) {
        this.clearForm()
        this.isFormOpen = false
      }
    },
  },
}
</script>
