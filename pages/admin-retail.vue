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
  name: 'AdminRetailParent',
  components: { Sidebar },
  middleware: ['auth', 'admin-retail'],
  data() {
    return {
      menu: [
        { link: '/admin-retail', label: 'Dashboard' },
        { link: '/admin-retail/store', label: 'Store' },
        { link: '/admin-retail/product', label: 'Product' },
        { link: '/admin-retail/product-type', label: 'Product Type' },
        { link: '/admin-retail/brand', label: 'Brand' },
        { link: '/admin-retail/vendor', label: 'Vendor' },
      ],
    }
  },
  computed: {
    title() {
      const menu = this.menu.find((v) => v.link === this.$route.path)
      return menu ? menu.label : null
    },
  },
}
</script>
