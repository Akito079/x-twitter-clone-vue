<script setup>
import { ref, onMounted, onUpdated, watch } from "vue";
import PostReaction from "./PostReaction.vue";
import { usePostStore } from "@/stores/posts";
import { Dropdown } from "flowbite";
import { useAuthStore } from "@/stores/auth";
const posts = ref([]);
const user = ref([]);
const watchProp = ref(false);
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

// show posts from server asynchronously
const newfeed = async () => {
  await postStore.postsIndex();
  posts.value = postStore.getPosts;
};

// after creating new posts the new posts will be shown on the page without reload
const handleNewpostEvent = async () => {
  if (watchProp.value === true) {
    await postStore.postsIndex();
    posts.value = postStore.getPosts;
    emits("changeUpdateStatus", false);
  }
};

//delete posts
const handlePostdelete = async (postId) => {
  await postStore.postDestroy(postId);
  watchProp.value = true;
};

onMounted(async () => {
  await userStore.authUser();
  user.value = userStore.getAuthUser;
});

onUpdated(() => {
  watchProp.value = props.reloadPosts;
});

watch(
  watchProp,
  async () => {
    await handleNewpostEvent();
  },
  { immediate: true }
);

await newfeed();
</script>
<template>
  <div
    v-if="posts.length != 0"
    v-for="post in posts"
    :key="post.id"
    class="flex gap-3 py-3 px-3 mobile:px-8 hover:bg-gray-100 border-[1px] border-slate-900/5 dark:border-[1px] dark:border-gray-700 dark:hover:bg-slate-900 duration-300"
  >
    <!-- avatar starts -->
    <div class="shrink-0">
      <img
        src="../../../public/Images/Ahn yujin.jpg"
        class="w-8 mobile:w-10 h-8 mobile:h-10 rounded-full object-cover"
        alt=""
      />
    </div>
    <!-- avatar ends -->
    <div class="flex flex-col w-full gap-1 items-start">
      <!-- user name -->
      <div class="flex items-center gap-2 w-full">
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
              <li v-if="post.userId === user.id">
                <a
                  href="#"
                  class="flex items-center gap-2 font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>

                  Edit</a
                >
              </li>
              <li v-if="post.userId === user.id">
                <span
                  @click="handlePostdelete(post.id)"
                  class="flex items-center gap-2 font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>

                  Delete</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <span class="text-[13px] -mt-2 text-gray-500">{{
        post.createdDate
      }}</span>
      <!-- user name ends -->
      <!-- content starts here -->
      <div class="flex flex-col">
        <div class="max-w-[300px]">
          <p class="dark:text-gray-300 max-w-[350px] break-words">
            {{ post.content }}
          </p>
        </div>
        <a class="text-blue-300"></a>
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
                ? ' rounded-2xl  object-cover'
                : ' rounded-2xl object-cover aspect-square',
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
</template>
