<script setup>
import { ref, onMounted } from "vue";
import LeftSideBar from "@/components/Navbars/LeftSideBar.vue";
import RightSideBar from "@/components/Navbars/RightSideBar.vue";
import NavBar from "@/components/Navbars/NavBar.vue";
import FooterNav from "@/components/Navbars/FooterNav.vue";
import PostHeader from "@/components/Posts/PostHeader.vue";
import Posts from "@/components/Posts/Posts.vue";
import PostButton from "@/components/Posts/PostButton.vue";
import { initFlowbite } from "flowbite";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/posts";
//mobile responsive effects
const position = ref("");
const contrast = ref("");
let preScrollPos = window.scrollY;
const userStore = useAuthStore();
const postStore = usePostStore();
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
onMounted(() => initFlowbite());
</script>
<template>
  <!-- main wrapper for all content -->
  <section
    class="flex flex-col mobile:flex-row mobile:justify-center dark:bg-[#191919]"
  >
    <!-- mobile size navbar starts here -->
    <div
      id="navbar"
      class="mobile:hidden duration-300 backdrop-blur-lg sticky w-full"
      :class="position"
    >
      <NavBar></NavBar>
    </div>
    <!-- mobile size nabar ends here -->

    <!-- Mobile size post btn -->
    <div class="mobile:hidden fixed bottom-20 right-5" :class="contrast">
      <PostButton />
    </div>
    <!-- Mobile size post btn end -->

    <!-- left side navbars -->
    <LeftSideBar></LeftSideBar>

    <!-- new feed starts here  -->
    <div class="w-full mobile:w-[750px]">
      <PostHeader></PostHeader>
      <!-- posts start here -->
      <Posts />
    </div>

    <!-- right side bar -->
    <RightSideBar></RightSideBar>

    <!-- footer nav -->
    <div
      class="mobile:hidden sticky bottom-0 flex justify-between px-5 py-2 bg-white duration-300 dark:bg-black ring-1 ring-slate-900/5 dark:ring-gray-500 items-center col-span-6 w-full"
      :class="contrast"
    >
      <FooterNav />
    </div>
  </section>
</template>
