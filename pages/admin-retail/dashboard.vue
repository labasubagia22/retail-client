<template>
  <div class="flex">
    <dashboard-menu :menu="menu" />
    <nuxt-child class="flex-1" />
  </div>
</template>

<script>
import DashboardMenu from '../../components/DashboardMenu.vue'

export default {
  name: 'Dashboard',
  components: { DashboardMenu },
  data() {
    return {
      menu: [
        { link: '/admin-retail/dashboard', label: 'Index' },
        {
          link: '/admin-retail/dashboard/top-selling-store',
          label: 'Top Selling Store',
        },
        {
          link: '/admin-retail/dashboard/product-outsell',
          label: 'Product Compare',
        },
        {
          link: '/admin-retail/dashboard/product-buy-within',
          label: 'Product Buy Within',
        },
      ],
    }
  },
}
</script>
