<script setup>
import EditPostModal from "./EditPostModal.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import PostReaction from "./PostReaction.vue";
import Comment from "./Comment.vue";
import { usePostStore } from "@/stores/posts";
import { Dropdown } from "flowbite";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
const posts = ref([]);
const user = ref([]);
const router = useRouter();
const watchProp = ref(false);
const postStore = usePostStore();
const userStore = useAuthStore();
const dropdownStatus = ref(false);
const props = defineProps(["postId"]);

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

const deletePost = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgb(28 100 242)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        confirmButtonColor: "rgb(28 100 242)",
        icon: "success",
      });
      await postStore.postDestroy(posts.value.id);
      posts.value = [];
      router.push("/");
    }
  });
};

onMounted(async () => {
  await postStore.getPostDetail(props.postId);
  posts.value = postStore.getPosts;
  await userStore.authUser();
  user.value = userStore.getAuthUser;
});

watch(watchProp, async () => {
  if (watchProp.value === true) {
    await postStore.getPostDetail(props.postId);
    posts.value = postStore.getPosts;
    watchProp.value = false;
  }
});
</script>
<template>
  <div
    v-if="posts.length != 0"
    class="flex gap-3 py-3 px-3 mobile:px-8 border-[1px] border-slate-900/5 dark:border-[1px] dark:border-gray-700 duration-300"
  >
    <div class="flex flex-col w-full gap-1 items-start">
      <!-- user name -->
      <div class="flex items-start gap-2 w-full">
        <!-- avatar starts -->
        <div class="shrink-0">
          <img
            src="../../../public/Images/Ahn yujin.jpg"
            class="w-8 mobile:w-10 h-8 mobile:h-10 rounded-full object-cover"
            alt=""
          />
        </div>
        <!-- avatar ends -->
        <div class="flex flex-col">
          <h3 class="font-bold dark:text-white">{{ posts.userName }}</h3>
          <span class="text-gray-500">@{{ posts.userNickname }}</span>
        </div>
        <!-- drop down -->
        <div class="ml-auto">
          <button
            :id="posts.id"
            @click="handleDropdown(posts.id, 'menu' + posts.id)"
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
            :id="'menu' + posts.id"
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
                  >Unfollow @{{ posts.userNickname }}</a
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
              <li v-if="user.id === posts.userId">
                <EditPostModal
                  @updated-post="
                    (status) => {
                      watchProp = status;
                    }
                  "
                  :postId="posts.id"
                  :user-id="user.id"
                ></EditPostModal>
              </li>
              <li v-if="user.id === posts.userId" @click="deletePost()">
                <span
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

      <!-- user name ends -->
      <!-- content starts here -->
      <div class="flex flex-col">
        <div class="max-w-[300px]">
          <p class="dark:text-gray-300 max-w-[350px] break-words">
            {{
              posts.hashTags.length === 0
                ? posts.content
                : posts.content.replace(/#(\w+)/g, "")
            }}
          </p>
        </div>
        <a
          v-for="hashTag in posts.hashTags"
          :key="hashTag.id"
          class="text-blue-500"
          >#{{ hashTag.name }}</a
        >
      </div>
      <!-- content ends here -->
      <!-- images start here -->
      <div class="grid grid-cols-2 w-full gap-2 rounded-2xl overflow-hidden">
        <div
          v-for="image in posts.media"
          :class="[posts.media.length == 1 ? 'col-span-2' : 'col-span-1']"
        >
          <img
            :src="'http://localhost:8000/postImages/' + image"
            :class="[
              posts.media.length == 1
                ? ' w-full rounded-2xl  object-cover'
                : ' w-full rounded-2xl object-cover aspect-square',
            ]"
            alt=""
          />
        </div>
      </div>
      <!-- images end here -->
      <div class="">
        <span class="-mt-5 text-gray-500">{{ posts.createdDate }}</span>
      </div>
      <!-- reaction button starts here -->
      <div
        class="w-full border-y-[1px] border-y-slate-200 dark:border-y-gray-500 py-3"
      >
        <PostReaction
          :post-id="posts.id"
          :user-id="user.id"
          :comment-count="posts.comments"
          :reaction-count="posts.reactions"
          :react-status="posts.reactStatus"
        ></PostReaction>
      </div>
      <!-- reaction button ends here -->
      <div class="w-full">
        <Comment
          :post-id="posts.id"
          :user-id="posts.userId"
          :comments="posts.commentDetails"
        ></Comment>
      </div>
    </div>
  </div>
</template>
