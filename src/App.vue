<template>
  <div
    id="app"
    class="bg-primary fixed flex h-screen min-h-screen w-screen gap-1"
  >
    <Sidebar />
    <div class="flex flex-col ml-20 mt-14">
      <MainView />
      <div class="flex">
        <Counter title="Number of Students"/>
        <Counter title="Number of Books Available"/>
        <Counter title="Number of Unreturned Books"/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import MainView from "./components/MainView.vue";
import Counter from "./components/Counter.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    MainView,
    Counter,
  },
};
</script>


