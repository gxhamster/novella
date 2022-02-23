<template>
  <div id="app" class="bg-transparent fixed flex h-screen min-h-screen w-screen">
    <SideBar class="rounded-tl-xl rounded-bl-xl shadow-inner"/>
    <MainView class="rounded-tr-xl rounded-br-xl shadow-inner" />
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue'
import MainView from './components/MainView'
</script>

<style scoped>
#app {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>
