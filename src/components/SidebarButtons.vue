<template>
  <div class="flex space-x-2 flex-grow">
    <slot></slot>
    <button class="text-white text-1xl">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: "SidebarButton",
  props: {
    title: String,
    image: String
  }
}
</script>
