<template>
  <div class="w-full ml-8 mt-10 mb-10 flex-shrink">
    <ul class="flex flex-col justify-items-center">
      <div class="flex justify-center  flex-shrink-0 laptop:mb-5 desktop:mb-7">
        <img src="../assets/icon.png" class="laptop:w-32" alt="" />
      </div>
      <div class="text-center basis-1/4">
        <h6 class="text-4xl text-white">Novella Library</h6>
      </div>
      <div class="flex flex-col pl-8 pr-8 laptop:gap-4 desktop:gap-6 mt-6 desktop:mb-6">
        <SidebarButton title="Issue Books" />
        <SidebarButton title="Recieve Books" />
        <SidebarButton title="Add New Books" />
        <SidebarButton title="Add New Student" />
        <SidebarButton title="Issued List" />
        <SidebarButton title="History" />
      </div>
      <div class="mt-6 flex-shrink">
        <IconButtons/>
      </div>
      <div class="bg-white-100 text-white text-center mt-4">
        <h1 class="text-6xl font-semibold">NOVELLA</h1>
        <h1 class="text-1xl font-light">LIBRARY MANAGEMENT SYSTEM</h1>
      </div>
    </ul>
  </div>
</template>

<script>
import SidebarButton from "./SidebarButton.vue"
import IconButtons from "./IconButtons.vue"

export default {
  name: "Sidebar",
  components: {
    SidebarButton,
    IconButtons
  },
};
</script>