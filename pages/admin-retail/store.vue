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
      <p class="text-center">{{ form.id ? 'Edit' : 'Add New' }} Store</p>

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

        <!-- Address -->
        <input
          v-model="form.address"
          class="px-3 py-1 border-2 text-sm rounded mt-2 w-full"
          type="text"
          placeholder="Address"
        />
        <span
          v-if="validation && validation.address"
          class="text-xs text-red-500 mt-1"
          >{{ validation.address.join() }}</span
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
          <th class="border-2 p-2">Address</th>
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2">{{ v.address }}</td>
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
  name: 'Store',
  data() {
    return {
      form: {
        id: null,
        name: null,
        address: null,
      },
      isFormOpen: false,
      isLoading: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.store.list
    },
    validation() {
      return this.$store.state.store.validation
    },
    error() {
      return this.$store.state.store.error
    },
  },
  mounted() {
    this.loadingContainer(async () => {
      await this.$store.dispatch('store/loadList')
    })
  },
  methods: {
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
      this.$store.dispatch('store/clearError')
      this.form = {
        id: null,
        name: null,
        address: null,
      }
    },
    handleDelete(id) {
      this.loadingContainer(async () => {
        await this.$store.dispatch('store/delete', id)
      })
    },
    handleSave() {
      this.loadingContainer(async () => {
        if (this.form.id) await this.$store.dispatch('store/update', this.form)
        else await this.$store.dispatch('store/create', this.form)
        if (!this.error && !this.validation) {
          this.clearForm()
          this.isFormOpen = false
        }
      })
    },
  },
}
</script>
