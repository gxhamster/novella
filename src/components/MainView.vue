<template>
  <main
    class="w-full h-full bg-background flex laptop:gap-6 laptop:p-6 desktop:gap-6 desktop:p-6 desktop:pt-4 laptop:pt-2"
  >
    <WindowControls class="absolute right-3 top-0 w-title-bar" />
    <div class="flex flex-col flex-grow pt-4 gap-6 relative">
      <SearchBar class="self-end" />
      <router-view v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" class="custom-shadow" />
        </KeepAlive>
      </router-view>
    </div>
    <div class="flex flex-col gap-6 pt-20">
      <div
        class="bg-secondary desktop:w-80 laptop:w-60 p-4 rounded-lgg h-full custom-shadow overflow-hidden"
      >
        <h1 class="laptop:text-2xl desktop:text-3xl text-center font-medium">
          Due Books
        </h1>
        <DueBooks />
      </div>
      <BookCounter />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBar from "./SearchBar";
import BookCounter from "./BookCounter.vue";
import DueBooks from "./DueBooks";
import WindowControls from "./WindowControls";

const router = useRouter();
const current_route = ref("");

// When route changed
router.afterEach((to) => {
  const to_path = to.path;
  current_route.value = to_path;
});
</script>

<style scoped>
.counter-will-change {
  will-change: height;
  will-change: opacity;
}
</style>
