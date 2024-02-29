<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/posts";
import { initPopovers } from "flowbite";
const router = useRouter();
const authStore = useAuthStore();
const postStore = usePostStore();
const user = ref([]);
const handleLogout = async () => {
  try {
    await authStore.signOut();
    postStore.emptyPosts();
    localStorage.removeItem("token");
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  initPopovers();
  await authStore.authUser();
  user.value = authStore.getAuthUser;
});
</script>
<template>
  <!-- popover button -->
  <button
    data-popover-target="popover-click"
    data-popover-trigger="click"
    type="button"
    class="flex items-center gap-1 my-5 duration-300 hover:bg-gray-300 dark:hover:bg-slate-800 xl:px-4 xl:py-2 rounded-full"
  >
    <div class="flex items-center shrink-0">
      <img
        :src="'http://localhost:8000/profileImages/' + user.profileImage"
        class="rounded-full object-cover w-10 h-10"
        alt=""
      />
    </div>
    <div class="hidden xl:flex flex-col">
      <span>{{ user.name }}</span>
      <span class="text-slate-700 dark:text-gray-300"
        >@{{ user.nickName }}</span
      >
    </div>
    <div class="hidden xl:block ml-5">
      <i class="fa-solid fa-ellipsis"></i>
    </div>
  </button>

  <!-- popover content -->
  <div
    data-popover
    id="popover-click"
    role="tooltip"
    class="absolute z-10 invisible inline-block w-[200px] text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
  >
    <div class="flex flex-col items-start">
      <router-link to="/account" class="font-bold text-black dark:text-gray-300 p-4">
        Account Setting
      </router-link>
      <button
        @click="handleLogout"
        class="font-bold text-black dark:text-gray-300 p-4"
      >
        Log out @{{ user.nickName }}
      </button>
    </div>
    <div data-popper-arrow></div>
  </div>
</template>
