<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import LeftSideBar from "@/components/Navbars/LeftSideBar.vue";
import RightSideBar from "@/components/Navbars/RightSideBar.vue";
import NavBar from "@/components/Navbars/NavBar.vue";
import FooterNav from "@/components/Navbars/FooterNav.vue";
import SearchBar from "@/components/Navbars/SearchBar.vue";
import PostButton from "@/components/Posts/PostButton.vue";
import SearchResults from "@/components/Search/SearchResults.vue";
import { initDrawers } from "flowbite";
//mobile responsive effects
const position = ref("");
const contrast = ref("");
const route = useRoute();
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
onMounted(() => {
  initDrawers();
});
</script>
<template>
  <!-- main wrapper for all content -->
  <section
    class="flex flex-col mobile:flex-row mobile:justify-center dark:bg-[#191919]"
  >
    <!-- Mobile size post btn -->
    <div class="mobile:hidden fixed bottom-20 right-5" :class="contrast">
      <PostButton />
    </div>
    <!-- Mobile size post btn end -->

    <!-- left side navbars -->
    <LeftSideBar></LeftSideBar>

    <!-- new feed starts here  -->
    <div class="w-full mobile:w-[750px] min-h-screen">
      <!-- Search Results start here -->
      <SearchResults></SearchResults>
    </div>

    <!-- right side bar -->
    <RightSideBar :trend-status="true" :folllow-status="true"></RightSideBar>

    <!-- footer nav -->
    <div
      class="mobile:hidden sticky bottom-0 flex justify-between px-5 py-2 bg-white duration-300 dark:bg-black ring-1 ring-slate-900/5 dark:ring-gray-500 items-center col-span-6 w-full"
      :class="contrast"
    >
      <FooterNav />
    </div>
  </section>
</template>
