<template>
  <div class="text-gray-700">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  created() {
    this.loadingContainer(async () => {
      await this.$store.dispatch('user/loadCurrent')
    })
  },
}
</script>
