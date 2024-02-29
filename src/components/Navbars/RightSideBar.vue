<script setup>
import SearchBar from "./SearchBar.vue";
import TrendCard from "./TrendCard.vue";
import FollowCard from "./FollowCard.vue";
import TermsServices from "./TermsServices.vue";
const props = defineProps({trendStatus:Boolean,folllowStatus:Boolean,searchStatus:Boolean})
</script>
<template>
  <div
    class="hidden lg:block sticky top-0 h-screen overflow-y-scroll no-scrollbar border-l-[1px] border-l-slate-900/5 dark:border-l-gray-700"
  >
    <div class="px-4 py-4 max-w-[400px] flex flex-col gap-4">
      <SearchBar v-if="props.searchStatus"></SearchBar>
      <!-- Subcribe section -->
      <div
        class="flex flex-col gap-1 px-3 py-2 rounded-xl bg-gray-100 duration-300 dark:bg-slate-900 dark:text-gray-200"
      >
        <h3 class="font-bold text-lg">Subscribe to Premium</h3>
        <p class="text-gray-700 dark:text-gray-200">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <div class="my-1">
          <button
            class="px-5 py-2 bg-slate-900 rounded-full duration-300 text-white dark:bg-blue-600"
          >
            Subscribe
          </button>
        </div>
      </div>
      <!-- Subscribe section ends here -->
      <TrendCard v-if="props.trendStatus" />
      <FollowCard v-if="props.folllowStatus" />
      <TermsServices />
    </div>
  </div>
</template>
