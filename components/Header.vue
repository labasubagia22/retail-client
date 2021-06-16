<template>
  <div class="bg-white-500 shadow h-16 flex justify-center items-center">
    <div class="p-4 w-8/12 flex justify-between items-center">
      <!-- left -->
      <div>
        <router-link class="text-lg" to="/">Mahabaratha</router-link>
        <p class="text-xs text-gray-400">Departement Store</p>
      </div>

      <!-- center -->
      <div class="flex text-sm text-blue-400">
        <router-link
          v-for="(v, i) in links"
          v-show="v.isShow"
          :key="i"
          :class="[
            'mr-2 p1 px-2 border-2 border-blue-300 rounded',
            'flex justify-center items-center',
            'transition duration-100',
            'hover:bg-blue-500 hover:border-blue-500 hover:text-white',
            $route.path === v.path
              ? 'bg-blue-500 border-blue-500 text-white'
              : null,
          ]"
          :to="v.path"
        >
          {{ v.label }}
        </router-link>
      </div>

      <!-- right -->
      <div class="flex">
        <!-- store -->
        <select v-model="storeId" class="p-2 px-3 rounded text-sm mr-2">
          <option value="" disabled>Select Store</option>
          <option v-for="s in stores" :key="s.id" :value="s.id">
            {{ s.name }}
          </option>
        </select>

        <!-- auth -->
        <div class="flex">
          <router-link
            v-if="!user"
            :class="[
              'p-1 px-2 bg-green-400 rounded text-sm flex items-center justify-center',
              'text-gray-800 mr-2',
            ]"
            to="/login"
            >Login</router-link
          >
          <button
            v-else
            :class="[
              'p-1 px-2 bg-red-500 rounded flex items-center justify-center',
              'text-white text-xs',
            ]"
            @click="hanldleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      storeId: null,
    }
  },
  computed: {
    stores() {
      return this.$store.state.store.list
    },
    user() {
      return this.$store.state.user.current
    },
    selectedStoreId() {
      return this.$store.state.store.selectedStoreId
    },
    links() {
      return [
        {
          path: '/',
          label: 'Home',
          isShow: true,
        },
        {
          path: '/admin-retail/dashboard',
          label: 'Admin',
          isShow: this.user && this.user.type === 'admin_retail',
        },
        {
          path: '/admin-store/dashboard',
          label: 'Admin',
          isShow: this.user && this.user.type === 'admin_store',
        },
        {
          path: '/order',
          label: 'Order',
          isShow: this.user && this.user.type === 'customer',
        },
        {
          path: '/cart',
          label: 'Cart',
          isShow: this.user && this.user.type === 'customer',
        },
      ]
    },
  },
  watch: {
    storeId(val) {
      this.$store.commit('store/setSelectedStoreId', val)
    },
    selectedStoreId() {
      this.handleSelectedStoreChanged()
    },
  },
  created() {
    this.loadingContainer(async () => {
      await this.$store.dispatch('store/loadList')
      await this.initializeStoreId()
    })
  },
  methods: {
    initializeStoreId() {
      if (this.storeId) return
      if (!this.stores.length) return
      const id = this.selectedStoreId ? this.selectedStoreId : this.stores[0].id
      this.storeId = id
      this.$store.commit('store/setSelectedStoreId', id)
    },
    handleSelectedStoreChanged() {
      this.loadingContainer(async () => {
        const storeId = this.selectedStoreId
        await this.$store.dispatch('inventory/loadList', { store_id: storeId })
      })
    },
    hanldleLogout() {
      this.loadingContainer(async () => {
        await this.$store.dispatch('user/logout')
        if (!this.$store.state.user.current) {
          this.$store.dispatch('cart/cartClear')
          this.$router.push('/')
        }
      })
    },
  },
}
</script>
