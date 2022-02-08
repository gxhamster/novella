<template>
  <div class="w-full ml-10 mt-14 mb-10 p-1 ">
    <ul class="flex flex-col justify-items-center min-h-full">
      <div class="flex justify-center  flex-shrink-0 mb-7">
        <img src="../assets/icon.png" alt="" />
      </div>
      <div class="text-center basis-1/4">
        <h6 class="text-4xl text-white">Novella Library</h6>
      </div>
      <div class="flex flex-col pl-8 pr-8 gap-6 mt-6 mb-6">
        <SidebarButton title="Issue Books" />
        <SidebarButton title="Recieve Books" />
        <SidebarButton title="Add New Books" />
        <SidebarButton title="Add New Student" />
        <SidebarButton title="Issued List" />
        <SidebarButton title="History" />
      </div>
      <div class="mt-6flex-shrink">
        <IconButtons/>
      </div>
      <div class="bg-white-100 text-white text-center">
        <h1 class="text-8xl">Novella</h1>
        <h1 class="text-2xl">Library Management System</h1>
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