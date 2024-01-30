<script setup>
import Logo from './Logo.vue';
import Theme from './Theme.vue';
import LeftDrawer from './Modals/LeftDrawer.vue';
</script>
<template>
     <div class="flex items-center justify-between p-3">
        <LeftDrawer></LeftDrawer>
        <Logo></Logo>
       <Theme></Theme>
    </div>
    <div class="grid grid-cols-2 dark:text-gray-300">
      <div class="col-span-1 text-center py-2 hover:bg-slate-900/10 dark:hover:bg-slate-700 ">For you</div>
      <div class="col-span-1 text-center py-2 hover:bg-slate-900/10 dark:hover:bg-slate-700">Following</div>
    </div>
</template>