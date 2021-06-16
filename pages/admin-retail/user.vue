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
      <p class="text-center">{{ form.id ? 'Edit' : 'Add New' }} User</p>

      <p v-if="error" class="text-xs text-center text-red-500 mt-1">
        {{ error.response.data.error }}
      </p>

      <div class="mt-4">
        <!-- Email -->
        <input
          v-model="form.email"
          class="px-3 py-1 border-2 text-sm rounded w-full"
          type="text"
          placeholder="Email"
        />
        <span
          v-if="validation && validation.email"
          class="text-xs text-red-500 mt-1"
          >{{ validation.email.join() }}</span
        >
      </div>

      <!-- Password -->
      <div class="mt-4">
        <input
          v-model="form.password"
          class="px-3 py-1 border-2 text-sm rounded w-full"
          type="password"
          placeholder="Password"
        />
        <span
          v-if="validation && validation.password"
          class="text-xs text-red-500 mt-1"
          >{{ validation.password.join() }}</span
        >
      </div>

      <!-- Address -->
      <div class="mt-4">
        <input
          v-model="form.address"
          class="px-3 py-1 border-2 text-sm rounded w-full"
          type="text"
          placeholder="Address"
          required
        />
        <span
          v-if="validation && validation.password"
          class="text-xs text-red-500 mt-1"
          >{{ validation.password.join() }}</span
        >
      </div>

      <!-- Name -->
      <div class="mt-4">
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
      </div>

      <!-- Type -->
      <div class="w-full mt-4">
        <select
          v-model="form.type"
          class="px-3 py-2 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select User Type
          </option>
          <option
            v-for="v in optionType"
            :key="v.val"
            :value="v.val"
            class="text-sm cursor-pointer"
          >
            {{ v.label }}
          </option>
        </select>
        <span
          v-if="validation && validation.type"
          class="text-xs text-red-500 mt-1"
          >{{ validation.type.join() }}</span
        >
      </div>

      <!-- Store -->
      <div v-if="form.type === 'admin_store'" class="w-full mt-4">
        <select
          v-model="form.store_id"
          class="px-3 py-2 text-sm rounded bg-white border-2 w-full"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select Type
          </option>
          <option
            v-for="v in optionStore"
            :key="v.id"
            :value="v.id"
            class="text-sm cursor-pointer"
          >
            {{ v.name }}
          </option>
        </select>
        <span
          v-if="validation && validation.store_id"
          class="text-xs text-red-500 mt-1"
          >{{ validation.store_id.join() }}</span
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
          <th class="border-2 p-2">Email</th>
          <th class="border-2 p-2">Name</th>
          <th class="border-2 p-2">Type</th>
          <th class="border-2 p-2">Store</th>
          <th class="border-2 p-2">Address</th>
          <th class="border-2 p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="text-sm">
        <tr v-for="(v, i) in list" :key="i">
          <td class="border-2 p-2">{{ v.email }}</td>
          <td class="border-2 p-2">{{ v.name }}</td>
          <td class="border-2 p-2">{{ v.type }}</td>
          <td class="border-2 p-2">{{ v.store ? v.store.name : 'N/A' }}</td>
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
  name: 'Product',
  data() {
    return {
      form: {
        id: null,
        email: null,
        name: null,
        password: null,
        type: '',
        store_id: '',
        address: null,
      },
      isFormOpen: false,
      isLoading: false,
    }
  },
  computed: {
    list() {
      return this.$store.state.user.list
    },
    validation() {
      return this.$store.state.user.validation
    },
    error() {
      return this.$store.state.user.error
    },
    optionStore() {
      return this.$store.state.store.list
    },
    optionType() {
      return [
        { val: 'admin_retail', label: 'Admin Retail' },
        { val: 'admin_store', label: 'Admin Store' },
        { val: 'customer', label: 'Customer' },
      ]
    },
  },
  mounted() {
    this.loadingContainer(async () => {
      await Promise.all([
        this.$store.dispatch('store/loadList'),
        this.$store.dispatch('user/loadAllByType'),
      ])
    })
  },
  methods: {
    handleEdit(v) {
      this.clearForm()
      this.isFormOpen = true
      this.form = {
        id: v.id,
        email: v.email,
        name: v.name,
        password: null,
        type: v.type,
        store_id: v.store_id,
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
      this.$store.dispatch('user/clearError')
      this.form = {
        id: null,
        email: null,
        name: null,
        password: null,
        type: '',
        store_id: '',
        address: null,
      }
    },
    handleDelete(id) {
      const isConfirmed = confirm(
        'Delete user will remove other data that correlated to this user, Are you sure?'
      )
      if (!isConfirmed) return
      this.loadingContainer(async () => {
        await this.$store.dispatch('user/delete', id)
      })
    },
    handleSave() {
      this.loadingContainer(async () => {
        if (this.form.id) {
          await this.$store.dispatch('user/update', this.form)
        } else {
          await this.$store.dispatch('user/add', this.form)
        }
        if (!this.error && !this.validation) {
          this.clearForm()
          this.isFormOpen = false
        }
      })
    },
  },
}
</script>
