<script setup>
import { ref } from 'vue';
const users = ref([
  {
    id : 1,
    name : 'AhnYujin',
    nickName : '@yujin_an',
    avatar : '../../Images/Yujin.jpg',
  },
  {
    id : 2,
    name : 'Minji',
    nickName : '@gominji',
    avatar : '../../Images/minj.jpg',
  },
  {
    id : 3,
    name : 'Sakura Miyawaki',
    nickName : '@saku_chan',
    avatar : '../../Images/sakura.jpg',
  },
]);
</script>
<template>
  <div
    class="flex flex-col gap-1 pt-2 overflow-hidden rounded-xl bg-gray-100 duration-300 dark:bg-slate-900 dark:text-gray-200"
  >
    <h3 class="text-lg px-3 font-bold">Who to follow</h3>
    <div
      v-for="user in users" :key="user.id"
      class="flex item-center gap-2 px-3 py-2 rounded-2xl duration-300 hover:bg-gray-200 dark:hover:bg-slate-800"
    >
      <div class="shrink-0">
        <img
          class=" w-10 h-10 rounded-full object-cover"
          :src="user.avatar"
          alt=""
        />
      </div>
      <div class="flex flex-col">
        <h3 class="font-bold">{{user.name}}</h3>
        <span class="text-gray-500">{{ user.nickName }}</span>
      </div>
      <div class="ml-auto">
        <button class="px-5 py-2  bg-slate-900 rounded-full text-gray-200 dark:bg-blue-600">
          Follow
        </button>
      </div>
      
    </div>
    <div class="px-3 py-2 duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 h-full   ">
      <button class="w-full  text-start text-blue-500">Show more</button>
    </div>
  </div>
</template>
