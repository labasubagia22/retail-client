<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-200">
    <div class="bg-white p-6 w-5/12 md:w-3/12 rounded-lg shadow">
      <h1 class="text-xl text-center">Register</h1>
      <p v-if="error" class="text-xs text-center text-red-500 mt-1">
        {{ error.name }}
      </p>
      <section class="flex flex-col mt-6">
        <!-- email -->
        <input
          v-model="form.email"
          class="px-3 py-2 border-2 text-sm rounded"
          type="text"
          placeholder="Email"
          required
        />
        <span
          v-if="validation && validation.email"
          class="text-xs text-red-500 mt-1"
          >{{ validation.email.join() }}</span
        >

        <!-- name -->
        <input
          v-model="form.name"
          class="px-3 py-2 border-2 text-sm rounded mt-4"
          type="text"
          placeholder="Name"
          required
        />
        <span
          v-if="validation && validation.name"
          class="text-xs text-red-500 mt-1"
          >{{ validation.name.join() }}</span
        >

        <!-- type -->
        <select
          v-model="form.type"
          class="mt-4 px-3 py-2 text-sm rounded bg-white border-2"
          required
        >
          <option class="text-sm text-gray-500" disabled value="">
            Select User Type
          </option>
          <option
            v-for="v in optionType"
            :key="v.value"
            :value="v.value"
            class="text-sm cursor-pointer"
          >
            {{ v.text }}
          </option>
        </select>
        <span
          v-if="validation && validation.name"
          class="text-xs text-red-500 mt-1"
          >{{ validation.name.join() }}</span
        >

        <!-- store_id -->
        <div v-if="form.type === 'admin_store'" class="w-full">
          <select
            v-model="form.store_id"
            class="mt-4 px-3 py-2 text-sm rounded bg-white border-2 w-full"
            required
          >
            <option class="text-sm text-gray-500" disabled value="">
              Select Store
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

        <!-- password -->
        <input
          v-model="form.password"
          class="px-3 py-2 border-2 mt-4 text-sm rounded"
          type="password"
          placeholder="Password"
        />
        <span
          v-if="validation && validation.password"
          class="text-xs text-red-500 mt-1"
          >{{ validation.password.join() }}</span
        >

        <p class="mt-3 text-xs text-center text-gray-500">
          Sudah punya akun?
          <nuxt-link class="text-blue-500" to="/login">Login</nuxt-link>
        </p>

        <!-- submit -->
        <button
          class="mt-6 w-full bg-blue-400 text-white p-2 text-sm rounded"
          @click="handleSubmit"
        >
          Submit
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  middleware: ['guest'],
  data() {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        store_id: '',
        type: '',
        address: '',
      },
    }
  },
  computed: {
    optionType() {
      return [
        { value: 'admin_retail', text: 'Admin Retail' },
        { value: 'admin_store', text: 'Admin Store' },
        { value: 'customer', text: 'Customer' },
      ]
    },
    optionStore() {
      return this.$store.state.store.list
    },
    validation() {
      return this.$store.state.user.validation
    },
    error() {
      return this.$store.state.user.error
    },
  },
  watch: {
    'form.type'(value) {
      if (value !== 'admin_store') {
        this.form.store_id = ''
      }
    },
  },
  mounted() {
    this.$store.dispatch('store/loadList')
  },
  methods: {
    async handleSubmit() {
      await this.$store.dispatch('user/register', this.form)
      this.$router.push('/login')
    },
  },
}
</script>
