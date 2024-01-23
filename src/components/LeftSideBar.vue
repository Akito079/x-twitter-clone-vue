<script setup>
import NavLink from "./NavLink.vue";
import Logo from "./Logo.vue";
</script>
<template>
  <!-- nav links wrrapper-->
  <div class="ml-auto  xl:w-full max-w-[250px] inline-flex flex-col items-start justify-start gap-2">
    <div class="">
      <Logo />
    </div>
    <NavLink/>
    <div
      class="flex items-center gap-2 duration-300  hover:bg-gray-300 dark:hover:bg-slate-900 xl:px-4 xl:py-2  sm:mr-2 rounded-full"
    >
      <div class="overflow-hidden flex justify-between items-center">
        <img src="../../../Images/minj.jpg" class="rounded-full shrink-0 w-10 h-10" alt="" />
      </div>
      <div class="hidden xl:flex flex-col">
        <span>Sora Kotaro</span>
        <span class="text-slate-700 dark:text-gray-300">@SoraKotaro2</span>
      </div>
      <div class="hidden xl:block ml-auto ">
        <i class="fa-solid fa-ellipsis"></i>
      </div>
    </div>
  </div>
  <!-- nav link wrapper ends -->
</template>
