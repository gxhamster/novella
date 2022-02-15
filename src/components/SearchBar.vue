<template>
  <div class="relative">
    <magnify-icon class="text-primary absolute top-4 right-6" icon="fa-regular fa-magnifying-glass" />
    <input class="bg-secondary text-gray-500 rounded-full appearance-none text-right outline-none px-4 pr-20 py-4" placeholder="Search..." >
  </div>
</template>

<script>
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'

export default {
  components: {
    MagnifyIcon
  }
}
</script>
