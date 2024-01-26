<script setup>
const trends = [
  {
    id : 1,
    hash : `#What'sHappenningInMyanmar`,
    postCount : '120K'
  },
  {
    id : 2,
    hash : `#IVE_AllNight_Cover`,
    postCount : '110K'
  },
  {
    id : 3,
    hash : `#Earth-Arcade`,
    postCount : '90K'
  },
  {
    id : 4,
    hash : `#Lesserafim`,
    postCount : '75K'
  },
  {
    id : 5,
    hash : `#Lesserafim`,
    postCount : '75K'
  },
  {
    id : 6,
    hash : `#Lesserafim`,
    postCount : '75K'
  },
  {
    id : 7,
    hash : `#Lesserafim`,
    postCount : '75K'
  },
  {
    id : 8,
    hash : `#Lesserafim`,
    postCount : '75K'
  },
  
]
</script>
<template>
  <div
    class="flex flex-col gap-1 pt-2 overflow-hidden rounded-xl bg-gray-100 duration-300 dark:bg-slate-900 dark:text-gray-200"
  >
    <h3 class="text-lg px-3 font-bold">Trends for you</h3>
    <div v-for="trend in trends" :key="trend.id" class="flex justify-between px-3 py-2 duration-300 hover:bg-gray-200 dark:hover:bg-slate-800">
      <div class="flex flex-col">
        <span class="text-gray-500 text-sm">Trending</span>
        <h3 class="font-bold text-sm">{{ trend.hash }}</h3>
        <span class="text-gray-500 text-sm">{{trend.postCount + 'posts'}}</span>
      </div>
      <div class="">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="w-5 h-5 rounded-full duration-300 hover:fill-gray-300  hover:bg-slate-900 dark:fill-gray-200 dark:hover:bg-blue-500 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1xvli5t r-1hdv0qi"
        >
          <g>
            <path
              d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
            ></path>
          </g>
        </svg>
      </div>
    </div>
    <div class="px-3 py-2 duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 h-full   ">
      <button class="w-full  text-start text-blue-500">Show more</button>
    </div>
  </div>
</template>
