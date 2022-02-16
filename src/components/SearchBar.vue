<template>
  <div class="relative">
    <magnify-icon class="text-primary absolute desktop:top-4 desktop:right-6 laptop:top-2 laptop:right-6" icon="fa-regular fa-magnifying-glass" />
    <input class="bg-secondary text-gray-500 rounded-full appearance-none text-right outline-none desktop:px-4 desktop:pr-20 laptop:pr-16 desktop:py-4 laptop:py-2" placeholder="Search..." >
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
