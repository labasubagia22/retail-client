import Vue from 'vue'

Vue.mixin({
  methods: {
    async loadingContainer(callback) {
      this.$root.$loading.start()
      await callback()
      this.$root.$loading.finish()
    },
  },
})
