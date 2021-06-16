import Vue from 'vue'

Vue.mixin({
  methods: {
    loadingContainer(callback) {
      this.$nextTick(async () => {
        if (!this.$root.$loading) {
          await callback()
          return
        }
        this.$root.$loading.start()
        await callback()
        this.$root.$loading.finish()
      })
    },
  },
})
