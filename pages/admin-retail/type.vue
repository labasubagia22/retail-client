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
      <p class="text-center">{{ form.id ? 'Edit' : 'Add New' }} Product Type</p>

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
        />
        <span
          v-if="validation && validation.name"
          class="text-xs text-red-500 mt-1"
          >{{ validation.name.join() }}</span
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
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
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
  name: 'ProductType',
  data() {
    return {
      form: {
        id: null,
        name: null,
      },
      isFormOpen: false,
      isLoading: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.productType.list
    },
    validation() {
      return this.$store.state.productType.validation
    },
    error() {
      return this.$store.state.productType.error
    },
  },
  created() {
    this.$store.dispatch('productType/loadList')
  },
  methods: {
    handleDelete(id) {
      this.$store.dispatch('productType/delete', id)
    },
    handleEdit(v) {
      this.clearForm()
      this.isFormOpen = true
      this.form = {
        id: v.id,
        name: v.name,
        address: v.address,
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
      this.$store.dispatch('productType/clearError')
      this.form = {
        id: null,
        name: null,
        address: null,
      }
    },
    async handleSave() {
      if (this.form.id)
        await this.$store.dispatch('productType/update', this.form)
      else await this.$store.dispatch('productType/create', this.form)
      if (!this.error && !this.validation) {
        this.clearForm()
        this.isFormOpen = false
      }
    },
  },
}
</script>
