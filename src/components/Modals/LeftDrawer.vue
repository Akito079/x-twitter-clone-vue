<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
const links = [
  {
    id: 1,
    tag: "Profile",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>`,
  },
  {
    id: 2,
    tag: "Premium",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>`,
  },
  {
    id: 3,
    tag: "Lists",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path></g></svg>`,
  },
  {
    id: 4,
    tag: "Bookmarks",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g></svg>`,
  },
  {
    id: 5,
    tag: "Communities",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z"></path></g></svg>`,
  },
  {
    id: 6,
    tag: "Monetizations",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M23 3v14h-2V5H5V3h18zM10 17c1.1 0 2-1.34 2-3s-.9-3-2-3-2 1.34-2 3 .9 3 2 3zM1 7h18v14H1V7zm16 10c-1.1 0-2 .9-2 2h2v-2zm-2-8c0 1.1.9 2 2 2V9h-2zM3 11c1.1 0 2-.9 2-2H3v2zm0 4c2.21 0 4 1.79 4 4h6c0-2.21 1.79-4 4-4v-2c-2.21 0-4-1.79-4-4H7c0 2.21-1.79 4-4 4v2zm0 4h2c0-1.1-.9-2-2-2v2z"></path></g></svg>`,
  },
  {
    id: 7,
    tag: "Ads",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M1.996 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.38 0 2.5 1.12 2.5 2.5v13c0 1.38-1.12 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.277 0-.5.22-.5.5v13c0 .28.223.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zm8.085 5H8.996V8h7v7h-2v-3.59l-5.293 5.3-1.415-1.42L12.581 10z"></path></g></svg>`,
  },
  {
    id: 8,
    tag: "Setting and privacy",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path></g></svg>`,
  },
  {
    id: 9,
    tag: "Logout",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6 rounded-full dark:fill-gray-300" data-testid="icon"><g><path d="M4 4.5C4 3.12 5.12 2 6.5 2h11C18.88 2 20 3.12 20 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 22 4 20.88 4 19.5V16h2v3.5c0 .28.22.5.5.5h11c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-11c-.28 0-.5.22-.5.5V8H4V4.5zm6.95 3.04L15.42 12l-4.47 4.46-1.41-1.42L11.58 13H2v-2h9.58L9.54 8.96l1.41-1.42z"></path></g></svg>`,
  },
];
onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <!-- drawer init and toggle -->
  <div class="text-center">
    <button
      type="button"
      data-drawer-target="drawer-example"
      data-drawer-show="drawer-example"
      aria-controls="drawer-example"
    >
      <img
        src="../../../Images/minj.jpg"
        class="w-8 h-8 rounded-full object-cover"
        alt=""
      />
    </button>
  </div>

  <!-- drawer component -->
  <Teleport to="body">
    <div
      id="drawer-example"
      class="fixed top-0 left-0 z-40 h-screen  overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <!-- dismiss modal button -->
      <button
        type="button"
        data-drawer-hide="drawer-example"
        aria-controls="drawer-example"
        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <!-- dismiss modal button ends -->
      <div class="flex flex-col  gap-3">
        <!-- avatar -->
        <div class="p-1 ml-4">
          <img
            src="../../../Images/minj.jpg"
            class="w-10 h-10 rounded-full"
            alt=""
          />
        </div>
        <!-- avatar ends -->
        <!-- username -->
        <div class="px-4">
          <h3 class="font-bold dark:text-white">Sora Kotaro</h3>
          <span class="text-gray-500 dark:text-gray-300">@SoraKotaro2</span>
        </div>
        <!-- username end -->
        <!-- followrings and follwers -->
        <div class="flex px-4 items-center gap-5">
          <div class="text-gray-500 dark:text-gray-300"><b>53</b> Followings</div>
          <div class="text-gray-500 dark:text-gray-300"><b>5</b> follwers</div>
        </div>
        <!-- followrings and follwers ends-->
        <!-- nav links -->
        <div class="flex flex-col ">
          <a v-for="link in links" :key="link.id" class="flex gap-2  px-4 py-4 items-center hover:bg-gray-300 dark:hover:bg-slate-700 duration-300">
            <span class="" v-html="link.icon"></span>
            <span class="dark:text-gray-300">{{ link.tag }}</span>
          </a>
        </div>
        <!-- nav links ends -->
      </div>
    </div>
  </Teleport>
</template>
