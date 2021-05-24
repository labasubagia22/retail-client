<template>
  <div>
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
