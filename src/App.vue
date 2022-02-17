<template>
  <div id="app" class="bg-background fixed flex h-screen min-h-screen w-screen" >
    <Sidebar />
    <MainView/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import MainView from './components/MainView'

export default {
  name: "App",
  components: {
    Sidebar,
    MainView,
  },
};
</script>
