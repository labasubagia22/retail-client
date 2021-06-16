<template>
  <div
    :class="[
      'h-screen p-4 px-5 flex flex-col',
      'bg-gray-100 border-r-4 border-gray-200 shadow-md ',
    ]"
  >
    <section>
      <div class="text-center mt-2">
        <router-link to="/" class="text-center mt-2 text-lg">
          Mahabarata
        </router-link>
        <p class="text text-gray-400">Departement Store</p>
      </div>

      <div v-if="user" class="mt-6 text-center text-sm">
        <p class="text-gray-600">{{ user.email }}</p>
        <p class="uppercase text-blue-400">
          {{ user.type.split('_').join(' ') }}
        </p>
      </div>

      <div v-if="user && user.store" class="text-sm text-center mt-6">
        <p class="">Store</p>
        <p class="text-blue-400">{{ user.store.name }}</p>
        <p class="text-xs text-gray-500">{{ user.store.address }}</p>
      </div>

      <div class="mt-8 flex flex-col">
        <nuxt-link
          v-for="(v, i) in menu"
          :key="i"
          :class="[
            'p-2 px-3 mb-3 rounded text-sm cursor-pointer text-center',
            'hover:bg-blue-400 hover:text-white',
            isMenuActive(v)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-600',
          ]"
          :to="v.link"
          >{{ v.label }}</nuxt-link
        >
      </div>
    </section>

    <section class="mt-4">
      <button
        class="p-2 text-sm rounded w-full text-white bg-red-500"
        @click="handleLogout"
      >
        Logout
      </button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
  computed: {
    user() {
      return this.$store.state.user.current
    },
  },
  methods: {
    handleLogout() {
      this.loadingContainer(async () => {
        await this.$store.dispatch('user/logout')
        if (!this.$store.state.user.current) {
          this.$store.dispatch('cart/cartClear')
          this.$router.push('/')
        }
      })
    },
    isMenuActive(menu) {
      return this.$route.path.includes(menu.link)
    },
  },
}
</script>
