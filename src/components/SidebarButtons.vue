<template>
  <div v-on:mouseover="isActive = true" v-on:mouseleave="isActive = false" class="flex space-x-2 flex-grow">
    <slot :isActive="isActive"></slot>
    <button class="text-white text-1xl">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: "SidebarButton",
  data() {
    return {
      isActive: false
    }
  },
  props: {
    title: String,
    image: String
  }
}
</script>
