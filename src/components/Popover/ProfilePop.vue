<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
onMounted(() => initFlowbite());
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
        src="../../../Images/minj.jpg"
        class="rounded-full object-cover w-10 h-10"
        alt=""
      />
    </div>
    <div class="hidden xl:flex flex-col">
      <span>Sora Kotaro</span>
      <span class="text-slate-700 dark:text-gray-300">@SoraKotaro2</span>
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
      <button class="font-bold text-black dark:text-gray-300 p-4">Add an existing account</button>
      <button class="font-bold text-black dark:text-gray-300 p-4">Log out @SoraKotaro2</button>
    </div>
    <div data-popper-arrow></div>
  </div>
</template>
