<template>
  <div class="w-full h-full flex text-gray-600">
    <!-- sidebar -->
    <sidebar :menu="menu" class="w-2/12 z-10 fixed" />

    <div class="w-2/12"></div>

    <!-- container -->
    <div class="w-10/12">
      <div class="p-4 px-6 shadow-md bg-gray-100 text-gray-600 fixed w-full">
        {{ title }} Page
      </div>

      <!-- content -->
      <NuxtChild class="p-6 mt-14" />
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'AdminStore',
  components: { Sidebar },
  middleware: ['auth', 'admin-store'],
  data() {
    return {
      menu: [
        { link: '/admin-store/dashboard', label: 'Dashboard' },
        { link: '/admin-store/order', label: 'Order' },
        { link: '/admin-store/inventory', label: 'Inventory' },
      ],
    }
  },
  computed: {
    title() {
      const menu = this.menu.find((v) => this.$route.path.includes(v.link))
      return menu ? menu.label : null
    },
  },
}
</script>
