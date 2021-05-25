<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-200">
    <div class="bg-white p-6 w-5/12 md:w-3/12 rounded-lg shadow">
      <h1 class="text-xl text-center">Login</h1>
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
        />
        <span
          v-if="validation && validation.email"
          class="text-xs text-red-500 mt-1"
          >{{ validation.email.join() }}</span
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
          >{{ validation.password.join() }}</span
        >

        <p class="mt-3 text-xs text-center text-gray-500">
          Belum punya akun?
          <nuxt-link class="text-blue-500" to="/register">Daftar</nuxt-link>
        </p>

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
import { getRedirectPath } from '../helpers'

export default {
  name: 'Login',
  middleware: ['guest'],
  data() {
    return {
      form: {
        email: '',
        password: '',
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
  methods: {
    async handleSubmit() {
      await this.$store.dispatch('user/login', this.form)
      if (!this.$store.state.user.current) return
      this.$router.push(getRedirectPath(this.$store.state.user.current.type))
    },
  },
}
</script>
