<script setup>
import { ref, computed } from "vue";
import LeftSideBar from "@/components/LeftSideBar.vue";
import NavBar from "@/components/NavBar.vue";
import PostHeader from "@/components/PostHeader.vue";
import Posts from "@/components/Posts.vue";
import FooterNav from "@/components/FooterNav.vue";
import PostButton from "@/components/PostButton.vue";
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
</script>
<template>
  <!-- main wrapper for all content -->
  <section class="grid grid-cols-6 xl:grid-cols-4 dark:bg-slate-800">
    <!-- mobile size navbar starts here -->
    <div
      id="navbar"
      class="mobile:hidden col-span-12 duration-300 backdrop-blur-lg fixed w-full"
      :class="position"
    >
      <NavBar></NavBar>
    </div>
    <!-- mobile size nabar ends here -->

    <!-- left side navbars -->
    <div
      class="hidden xl:col-span-1 mobile:flex justify-end sticky top-0 overflow-y-hidden h-screen ring-1 shadow-xl ring-slate-900/5 dark:ring-gray-700 p-5 dark:text-gray-300"
    >
      <LeftSideBar></LeftSideBar>
    </div>
    <!-- left side navbars -->

    <!-- new feed starts here  -->
    <div
      @scroll="stickyNavBar"
      class="mobile:col-span-5 md:col-span-4 xl:col-span-2 col-span-6"
    >
      <div class="mobile:block hidden sticky top-0 w-full">
        <PostHeader></PostHeader>
      </div>
      <!-- posts start here -->
      <div class="p-6">
        <Posts />
      </div>
    </div>
    <!-- new feed ends here  -->
    <!-- right side bar -->
    <div
      class="xl:col-span-1 hidden lg:block sticky top-0 h-screen col-span-1 ring-1 shadow-xl ring-slate-900/5 dark:ring-gray-700 p-5"
    ></div>
    <!-- right side bar ends here -->

    <!-- Post button For mobile  -->
    <div class="mobile:hidden fixed bottom-20 right-5" :class="contrast">
      <PostButton />
    </div>
    <!-- Post button for mobile ends here -->
    <!-- footer nav -->
    <div
      class="mobile:hidden flex justify-between px-5 py-2 bg-white duration-300 dark:bg-slate-800 sticky ring-1 ring-slate-900/5 dark:ring-gray-500 bottom-0 items-center col-span-6 w-full"
      :class="contrast"
    >
      <FooterNav />
    </div>
    <!-- footer nav ends here -->
  </section>
</template>
