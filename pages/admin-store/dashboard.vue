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
        { link: '/admin-store/dashboard', label: 'Index' },
        {
          link: '/admin-store/dashboard/top-sales-store',
          label: 'Top Sales this Store',
        },
        {
          link: '/admin-store/dashboard/top-sales-area',
          label: 'Top Sales this Area',
        },
      ],
    }
  },
}
</script>
