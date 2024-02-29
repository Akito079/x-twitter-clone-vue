<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import PostReaction from "../Posts/PostReaction.vue";
import SearchBar from "../Navbars/SearchBar.vue";
import { usePostStore } from "@/stores/posts";
import { Dropdown } from "flowbite";
import { useAuthStore } from "@/stores/auth";
const posts = ref([]);
const user = ref([]);
const router = useRouter();
const route = useRoute();
const routeQuery = ref("");
const watchProp = ref(false);
const loadingStatus = ref(false);
const postStore = usePostStore();
const userStore = useAuthStore();
const dropdownStatus = ref(false);
const props = defineProps({ reloadPosts: Boolean });
const emits = defineEmits(["changeUpdateStatus"]);

// create custom dropdown
const handleDropdown = (postId, menuId) => {
  dropdownStatus.value = !dropdownStatus.value;
  const $targetEl = document.getElementById(menuId);
  const $triggerEl = document.getElementById(postId);
  const dropdown = new Dropdown($targetEl, $triggerEl);
  if (dropdownStatus.value === true) {
    dropdown.show();
  } else {
    dropdown.hide();
  }
};

const searchPost = async () => {
 
  let token = localStorage.getItem("token");
  let header = {
    Authorization: `Bearer ${token}`,
  };
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  const response = await axios.get(
    `http://localhost:8000/api/posts?content[like]=${route.query.searchQuery}`,
    { headers: header }
  );
  posts.value = response.data.data;
};

const viewPost = (postId) => {
  router.push({
    name: "postDetail",
    params: { postId: postId },
  });
};

onMounted(async () => {
  loadingStatus.value = true;
  routeQuery.value = route.query.searchQuery;
  await userStore.authUser();
  user.value = userStore.getAuthUser;
  await searchPost();
  loadingStatus.value = false;

});
</script>
<template>
  <div
    class="flex gap-5 w-full items-center p-4 backdrop-blur-lg dark:text-gray-400"
  >
    <!-- back button -->
    <span
      @click="router.push('/')"
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
    <SearchBar @reload-results="searchPost()"></SearchBar>
  </div>
  <div
    v-if="posts.length != 0 && !loadingStatus"
    v-for="post in posts"
    :key="post.id"
    class="flex gap-3 py-3 px-3 mobile:px-8 hover:bg-gray-100 border-[1px] border-slate-900/5 dark:border-[1px] dark:border-gray-700 dark:hover:bg-slate-900 duration-300"
  >
    <!-- avatar starts -->
    <div class="shrink-0">
      <img
        :src="'http://localhost:8000/profileImages/' + post.userProfile"
        class="w-8 mobile:w-10 h-8 mobile:h-10 rounded-full object-cover"
        alt=""
      />
    </div>
    <!-- avatar ends -->
    <div class="flex flex-col w-full gap-1 items-start">
      <!-- user name -->
      <div class="flex items-start gap-2 w-full">
        <h3 class="font-bold dark:text-white">{{ post.userName }}</h3>
        <span class="text-gray-500">{{ "@" + post.userNickname }}</span>
        <!-- drop down -->
        <div class="ml-auto">
          <button
            :id="post.id"
            @click="handleDropdown(post.id, 'menu' + post.id)"
            class="dropdownDefaultButton hover:bg-blue-200 focus:outline-none font-medium rounded-full p-2 text-center inline-flex items-center dark:hover:bg-blue-700"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-black dark:text-white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            :id="'menu' + post.id"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-slate-800"
          >
            <ul class="py-2 text-gray-700 dark:text-gray-200">
              <li>
                <a
                  class="flex items-center font-bold gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="w-5 h-5 dark:fill-white"
                  >
                    <g>
                      <path
                        d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"
                      ></path>
                    </g></svg
                  >{{ "Unfollow @" + post.userNickname }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center gap-2 font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="w-5 h-5 dark:fill-white"
                  >
                    <g>
                      <path
                        d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
                      ></path>
                    </g>
                  </svg>
                  View post engagement</a
                >
              </li>
              <li>
                <button
                  @click="viewPost(post.id)"
                  class="flex w-full items-center gap-2 font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  View
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <span class="text-[13px] -mt-5 text-gray-500">{{
        post.createdDate
      }}</span>
      <!-- user name ends -->
      <!-- content starts here -->
      <div @click="viewPost(post.id)" class="flex flex-col w-full">
        <div class="max-w-[300px]">
          <p class="dark:text-gray-300 max-w-[350px] break-words">
            {{
              post.hashTags.length === 0
                ? post.content
                : post.content.replace(/#(\w+)/g, "")
            }}
          </p>
        </div>
        <a
          v-for="hashTag in post.hashTags"
          :key="hashTag.id"
          class="text-blue-500"
          >#{{ hashTag.name }}</a
        >
      </div>
      <!-- content ends here -->
      <!-- images start here -->
      <div class="grid grid-cols-2 w-full gap-2 rounded-2xl overflow-hidden">
        <div
          v-for="image in post.media"
          :class="[post.media.length == 1 ? 'col-span-2' : 'col-span-1']"
        >
          <img
            :src="'http://localhost:8000/postImages/' + image"
            :class="[
              post.media.length == 1
                ? ' rounded-2xl  object-cover max-h-[500px]'
                : ' rounded-2xl mobile:h-[350px] object-cover aspect-square',
            ]"
            alt=""
          />
        </div>
      </div>
      <!-- images end here -->

      <!-- reaction button starts here -->
      <div class="w-full">
        <PostReaction
          :post-id="post.id"
          :user-id="user.id"
          :comment-count="post.comments"
          :reaction-count="post.reactions"
          :react-status="post.reactStatus"
        ></PostReaction>
      </div>
      <!-- reaction button ends here -->
    </div>
  </div>
  <div v-if="posts.length === 0 && !loadingStatus" class="min-h-screen">
    <h1
      class="font-medium flex items-center justify-center gap-1 w-full text-gray-600 dark:text-gray-400 text-lg font-open-san"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>

      No Results...
    </h1>
  </div>
  <div v-if="loadingStatus" role="status" class="min-h-screen">
    <svg
      aria-hidden="true"
      class="w-8 h-8 mx-auto my-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  
</template>
