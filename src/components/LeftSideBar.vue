<script setup>
import NavLink from "./NavLink.vue";
import Logo from "./Logo.vue";
</script>
<template>
  <!-- nav links wrrapper-->
  <div
    class="hidden sticky top-0 mobile:flex h-screen border-r-[1px] border-slate-900/5 dark:border-r-gray-700 px-5 dark:text-gray-300"
  >
    <div class="inline-flex flex-col items-start justify-start gap-2">
      <Logo />
      <NavLink />
      <!-- profile card -->
      <div
        class="flex items-center gap-1 my-5 duration-300 hover:bg-gray-300 dark:hover:bg-slate-800 xl:px-4 xl:py-2 rounded-full"
      >
        <div class="flex items-center shrink-0">
          <img
            src="../../../Images/minj.jpg"
            class="rounded-full object-cover w-10 h-10"
            alt=""
          />
        </div>
        <div class="hidden xl:flex flex-col">
          <span>Sora Kotaro</span>
          <span class="text-slate-700 dark:text-gray-300">@SoraKotaro2</span>
        </div>
        <div class="hidden xl:block ml-5">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- nav link wrapper ends -->
</template>
