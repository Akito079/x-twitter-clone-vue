<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import LeftSideBar from "@/components/Navbars/LeftSideBar.vue";
import RightSideBar from "@/components/Navbars/RightSideBar.vue";
import FooterNav from "@/components/Navbars/FooterNav.vue";
const route = useRoute();
const router = useRouter();
const trends = ref([]);
const loadingStatus = ref(false);
//mobile responsive effects
const position = ref("");
const contrast = ref("");
let preScrollPos = window.scrollY;
window.onscroll = function () {
  let currentScrollPos = window.scrollY;
  if (preScrollPos > currentScrollPos) {
    position.value = "top-0";
    contrast.value = "opacity-100";
  } else {
    position.value = "-top-[100px]";
    contrast.value = "opacity-50";
  }
  preScrollPos = currentScrollPos;
};
onMounted(async () => {
  loadingStatus.value = true;
  let token = localStorage.getItem("token");
  let header = {
    Authorization: `Bearer ${token}`,
  };
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  const response = await axios.get("http://localhost:8000/api/hashtags", {
    headers: header,
  });
  // don't display a hashtag with zero post counts
  let filterTrends = response.data.data.filter((trend) => {
    return trend.postCount != 0;
  });
  // orderBy postCount to descending
  let sortTrends = filterTrends.sort((a, b) => {
    return parseInt(b.postCount) - parseInt(a.postCount);
  });
  trends.value = sortTrends;
  loadingStatus.value = false;
});
</script>
<template>
  <!-- main wrapper for all content -->
  <section
    class="flex flex-col mobile:flex-row mobile:justify-center dark:bg-[#191919]"
  >
    <!-- left side navbars -->
    <LeftSideBar></LeftSideBar>

    <div class="w-full mobile:w-[750px]">
      <div
        :class="[
          'sticky  w-full duration-300 border-b-[1px] outline-none z-50 border-b-slate-900/5 dark:border-b-gray-700',
          position,
        ]"
      >
        <div
          class="flex gap-5 items-center p-4 backdrop-blur-lg dark:text-gray-400"
        >
          <!-- back button -->
          <span
            @click="router.go(-1)"
            class="rounded-full p-1 hover:bg-gray-300 dark:hover:bg-slate-700"
            ><svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="w-6 h-6 dark:fill-gray-400"
            >
              <g>
                <path
                  d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
                ></path>
              </g></svg
          ></span>
          <h3 class="font-bold text-lg p-1">HashTags</h3>
        </div>
      </div>
      <!-- HashtagLists start here -->
      <div
        class="flex flex-col min-h-screen gap-1 overflow-hidden duration-300 dark:text-gray-200"
      >
        <div
          v-if="trends.length != 0 && !loadingStatus"
          v-for="trend in trends"
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
        </div>
        <div v-if="loadingStatus" role="status" class="h-screen">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mx-auto my-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <div v-if="trends.length === 0" class="min-h-screen my-5">
          <h1
            class="font-medium flex items-center justify-center gap-1 w-full text-gray-600 dark:text-gray-400 text-lg font-open-san"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            No HashTags...
          </h1>
        </div>
      </div>
    </div>

    <!-- right side bar -->
    <RightSideBar :search-status="true" :folllow-status="true"></RightSideBar>

    <!-- footer nav -->
    <div
      :class="[
        'mobile:hidden sticky bottom-0 flex justify-between px-5 py-2 bg-white duration-300 dark:bg-black ring-1 ring-slate-900/5 dark:ring-gray-500 items-center col-span-6 w-full',
        contrast,
      ]"
    >
      <FooterNav />
    </div>
  </section>
</template>
