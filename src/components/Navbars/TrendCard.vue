<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import axios from "axios";
const trends = ref([]);
onMounted(async () => {
  let token = localStorage.getItem("token");
  let header = {
    Authorization: `Bearer ${token}`,
  };
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  const response = await axios.get("http://localhost:8000/api/hashtags", {
    headers: header,
  });
  let filterTrends = response.data.data.filter((trend)=>{
    return trend.postCount != 0 ;
  })
  let sortTrends = filterTrends.sort((a, b) => {
    return parseInt(b.postCount) - parseInt(a.postCount);
  });
  trends.value = sortTrends;
});
</script>
<template>
  <div
    class="flex flex-col gap-1 pt-2 overflow-hidden rounded-xl bg-gray-100 duration-300 dark:bg-slate-900 dark:text-gray-200"
  >
    <h3 class="text-lg px-3 font-bold">Trends for you</h3>
    <div
      v-if="trends.length != 0"
      v-for="trend in trends.slice(0, 4)"
      :key="trend.id"
      @click="
        router.push({
          name: 'hashtagView',
          params: { hashtagId: trend.id, hashName: trend.name },
        })
      "
      class="flex justify-between px-3 py-2 duration-300 hover:bg-gray-200 dark:hover:bg-slate-800"
    >
      <div class="flex flex-col">
        <span class="text-gray-500 text-sm">Trending</span>
        <h3 class="font-bold text-sm">#{{ trend.name }}</h3>
        <span class="text-gray-500 text-sm">{{
          trend.postCount + "posts"
        }}</span>
      </div>
      <div class="">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="w-5 h-5 rounded-full duration-300 hover:fill-gray-300 hover:bg-slate-900 dark:fill-gray-200 dark:hover:bg-blue-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1xvli5t r-1hdv0qi"
        >
          <g>
            <path
              d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <div
      class="px-3 py-2 duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 h-full"
    >
      <button @click="router.push({name:'hashtagLists'})" class="w-full text-start text-blue-500">Show more</button>
    </div>
  </div>
</template>
