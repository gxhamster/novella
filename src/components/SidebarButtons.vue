<template>
  <div v-on:mouseover="isActive = true" v-on:mouseleave="isActive = false" class="flex space-x-2 flex-grow cursor-pointer">
    <slot :isActive="isActive"></slot>
    <button @click="$emit('clicked')" class="text-white desktop:text-lg laptop:text-md">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: "SidebarButton",
  emits: ['clicked'],
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

