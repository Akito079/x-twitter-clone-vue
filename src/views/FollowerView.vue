<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Followers from "@/components/Profile/Followers.vue";
import LeftSideBar from "@/components/Navbars/LeftSideBar.vue";
import RightSideBar from "@/components/Navbars/RightSideBar.vue";
import FooterNav from "@/components/Navbars/FooterNav.vue";
import { useAuthStore } from "@/stores/auth";
const router = useRouter();
const userStore = useAuthStore();
const user = ref([]);
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
  await userStore.authUser();
  user.value = userStore.getAuthUser;
});
</script>
<template>
  <!-- main wrapper for all content -->
  <section
    class="flex flex-col  mobile:flex-row mobile:justify-center dark:bg-[#191919]"
  >
    <!-- left side navbars -->
    <LeftSideBar></LeftSideBar>

    <!-- new feed starts here  -->
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
          <div class="flex flex-col">
            <h3 class="font-bold text-lg">Connect to</h3>
          </div>
        </div>
      </div>
      <!-- followers start here -->
      <Followers></Followers>
    </div>

    <!-- right side bar -->
    <RightSideBar :search-status="true" :trend-status="true"></RightSideBar>

    <!-- footer nav -->
    <div
      class="mobile:hidden sticky bottom-0 flex justify-between px-5 py-2 bg-white duration-300 dark:bg-black ring-1 ring-slate-900/5 dark:ring-gray-500 items-center col-span-6 w-full"
      :class="contrast"
    >
      <FooterNav />
    </div>
  </section>
</template>
