<template>
  <div class="flex flex-col justify-center items-center text-gray-700">
    <home-header class="w-full shadow-md fixed top-0 left-0" />
    <div class="w-8/12 mt-20">
      <nuxt />
    </div>
  </div>
</template>

<script>
import HomeHeader from '../components/Header.vue'
export default {
  name: 'ShopLayout',
  components: { HomeHeader },
  created() {
    this.$store.dispatch('user/loadCurrent')
  },
}
</script>
