<template>
  <div class="text-gray-700">
    <Nuxt />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('user/loadCurrent')
  },
}
</script>
