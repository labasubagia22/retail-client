<template>
  <div>
    <div>Home</div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  middleware: ['auth'],
  methods: {
    handleLogout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
  },
}
</script>
