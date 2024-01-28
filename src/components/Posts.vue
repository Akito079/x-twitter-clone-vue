<script setup>
import { ref, onMounted } from "vue";
import PostForm from "./PostForm.vue";
import PostReaction from "./PostReaction.vue";

const posts = [
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis laborum quis beatae, dicta nam repellat. Reiciendis modi suscipit maiores similique",
    image: ["../../Images/Ayla.jpeg"],
  },
  {
    id: 2,
    content: "My fav idols",
    image: [
      "../../Images/minj.jpg",
      "../../Images/sakura.jpg",
      "../../Images/Yujin.jpg",
    ],
  },
];
</script>
<template>
  <PostForm />
  <div
    v-for="post in posts"
    :key="post.id"
    class="flex gap-3 py-3 px-3 mobile:px-8 hover:bg-gray-100 border-[1px] border-slate-900/5 dark:border-[1px] dark:border-gray-700 dark:hover:bg-slate-900 duration-300"
  >
    <!-- avatar starts -->
    <div class="shrink-0">
      <img src="../../Images/Yujin.jpg" class="w-8 mobile:w-10 h-8 mobile:h-10 rounded-full" alt="" />
    </div>
    <!-- avatar ends -->
    <div class="flex flex-col max-w-full gap-1 items-start">
      <!-- user name -->
      <div class="flex items-center gap-2">
        <h3 class="font-bold dark:text-white">IVE_Ahn_Yujin</h3>
        <span class="text-sm text-gray-500">@yujin_an</span>
      </div>
      <!-- user name ends -->

      <!-- content starts here -->
      <div class="flex flex-col">
        <p class="dark:text-gray-300">
          {{ post.content }}
        </p>
        <a class="text-blue-300">#IVE_AhnYujin</a>
      </div>
      <!-- content ends here -->
      <!-- images start here -->
      <div class="grid grid-cols-2 rounded-2xl overflow-hidden">
        <div
          v-for="image in post.image"
          :class="[post.image.length == 1 ? 'col-span-2' : 'col-span-1']"
        >
          <img :src="image" class="w-full object-cover" alt="" />
        </div>
      </div>
      <!-- images end here -->

      <!-- reaction button starts here -->
      <PostReaction></PostReaction>
      <!-- reaction button ends here -->
    </div>
  </div>
</template>
