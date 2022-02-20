<template>
  <div id="app" class="bg-background fixed flex h-screen min-h-screen w-screen" >
    <SideBar />
    <MainView/>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue'
import MainView from './components/MainView'
</script>
