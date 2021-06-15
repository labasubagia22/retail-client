<template>
  <!-- sidenav -->
  <div class="mr-4 border-r-4 pr-4">
    <h1 class="font-bold">Insight List</h1>
    <ul class="mt-2">
      <li v-for="(v, i) in menu" :key="i" class="text-sm mt-1">
        <router-link
          :class="[$route.path == v.link ? 'text-blue-500' : null]"
          :to="v.link"
          >{{ v.label }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
}
</script>
