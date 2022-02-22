<template>
  <div class="flex justify-end">
    <div class="flex-grow" :style="drag_style"></div>
    <MinusIcon @click="minimizeWindow"  class="mt-4 transition duration-150 focus:bg-gray-500 hover:bg-gray-300 text-primary px-2 rounded-md"/>    
    <WindowCloseIcon @click="closeWindow"  class="mt-4 transition duration-150 focus:bg-gray-400 hover:bg-gray-300 text-primary px-2 rounded-md"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WindowCloseIcon from 'vue-material-design-icons/WindowClose.vue'
import MinusIcon from 'vue-material-design-icons/Minus.vue'

const drag_style = ref({
    '-webkit-app-region': 'drag',
    '-webkit-user-select': 'none'
  })

// function maximizeWindow() {
//   window.api.maximizeWindow()
// }

function closeWindow() {
  window.api.closeWindow()
}

function minimizeWindow() {
  console.log('minimize')
  window.api.minimizeWindow()
}


</script>