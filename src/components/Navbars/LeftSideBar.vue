<script setup>
import NavLink from "./NavLink.vue";
import Logo from "../Logo.vue";
import ProfilePop from "../Popover/ProfilePop.vue";
</script>
<template>
  <!-- nav links wrrapper-->
  <div
    class="hidden sticky top-0 mobile:flex h-screen border-r-[1px] border-slate-900/5 dark:border-r-gray-700 px-5 py-4 dark:text-gray-300"
  >
    <div class="inline-flex flex-col items-start justify-start gap-2">
      <Logo size="w-6 h-6" :hoverStatus="true" />
      <NavLink />
      <!-- profile card -->
      <ProfilePop></ProfilePop>
      <!-- profile card ends -->
    </div>
  </div>
  <!-- nav link wrapper ends -->
</template>
