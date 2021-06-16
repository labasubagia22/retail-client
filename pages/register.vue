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
        >
          {{ validation.password.join() }}
        </span>

        <!-- address -->
        <input
          v-model="form.address"
          class="px-3 py-2 border-2 text-sm rounded mt-4"
          type="text"
          placeholder="Address"
          required
        />
        <span
          v-if="validation && validation.address"
          class="text-xs text-red-500 mt-1"
          >{{ validation.address.join() }}</span
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
        type: 'customer',
        address: '',
      },
    }
  },
  computed: {
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
    this.loadingContainer(async () => {
      await this.$store.dispatch('store/loadList')
    })
  },
  methods: {
    handleSubmit() {
      this.loadingContainer(async () => {
        await this.$store.dispatch('user/register', this.form)
        if (this.error) return
        this.$router.push('/login')
      })
    },
  },
}
</script>
