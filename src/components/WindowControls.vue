<template>
  <div class="flex justify-end" :style="draggable ? drag_style : {'-webkit-user-select': 'none'}">
    <MinusIcon @click="minimizeWindow" :style="undrag_style" @mouseenter="draggable = false" @mouseleave="draggable = true" class="transition duration-150 focus:bg-gray-500 hover:bg-gray-300 text-primary px-2"/>    
    <WindowCloseIcon @click="closeWindow" :style="undrag_style" @mouseenter="draggable = false" @mouseleave="draggable = true" class="transition duration-150 focus:bg-gray-400 hover:bg-gray-300 text-primary px-2"/>
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

const undrag_style = ref({
  '-webkit-app-region': 'no-drag'
})
const draggable = ref(false)

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