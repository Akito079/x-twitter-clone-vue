<script setup>
import Logo from './Logo.vue';
import Theme from './Theme.vue';
</script>
<template>
     <div class="flex items-center justify-between p-3">
      <div class="">
        <img src="../../Images/minj.jpg" class="w-8 h-8 rounded-full" alt="">
      </div>
        <Logo></Logo>
       <Theme></Theme>
    </div>
    <div class="grid grid-cols-2 dark:text-gray-300">
      <div class="col-span-1 text-center py-2 hover:bg-slate-900/10 dark:hover:bg-slate-700 ">For you</div>
      <div class="col-span-1 text-center py-2 hover:bg-slate-900/10 dark:hover:bg-slate-700">Following</div>
    </div>
</template>