<script setup>
import Theme from './Theme.vue';
</script>
<template>
  <div class="grid grid-cols-5 backdrop-blur-sm dark:text-gray-400">
    <div class="col-span-2 duration-300 text-center px-10 py-3 hover:bg-slate-900/10 dark:hover:bg-slate-700">For you</div>
    <div class="col-span-2 duration-300 text-center px-10 py-3 hover:bg-slate-900/10 dark:hover:bg-slate-700">Following</div>
    <div class="col-span-1 flex items-center justify-center">
      <Theme/>
    </div>
  </div>
</template>