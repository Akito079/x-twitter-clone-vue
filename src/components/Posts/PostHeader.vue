<script setup>
import Theme from "../Theme.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <div
    class="mobile:block hidden sticky top-0 w-full border-b-[1px] outline-none z-50 border-b-slate-900/5 dark:border-b-gray-700"
  >
    <div class="grid grid-cols-5 backdrop-blur-lg dark:text-gray-400">
      <div
        class="col-span-2 duration-300 text-center px-10 py-3 hover:bg-slate-900/10 dark:hover:bg-slate-700"
      >
        For you
      </div>
      <router-link
        :to="{ name: 'followerPage' }"
        class="col-span-2 duration-300 text-center px-10 py-3 hover:bg-slate-900/10 dark:hover:bg-slate-700"
      >
        Connect to
      </router-link>
      <div class="col-span-1 flex items-center justify-center">
        <Theme />
      </div>
    </div>
  </div>
</template>
