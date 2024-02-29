<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import axios from "axios";
import { usePostStore } from "@/stores/posts";
import { useAuthStore } from "@/stores/auth";
import CommentEdit from "./CommentEdit.vue";
import { initDropdowns, Dropdown } from "flowbite";
const props = defineProps([
  "comments",
  "userName",
  "userNickName",
  "userId",
  "postId",
]);
const emits = defineEmits(["reloadComments"]);
const postStore = usePostStore();
const userStore = useAuthStore();
const loadingStatus = ref(false);
const posts = ref([]);
const users = ref([]);
const avatar = ref("");
const comments = ref([]);
const watchComment = ref(false);
const dropdownStatus = ref(false);
const form = reactive({
  commentContent: "",
  userId: "",
  postId: "",
});

const handleDropdown = (commentId, menuId) => {
  dropdownStatus.value = !dropdownStatus.value;
  const $targetEl = document.getElementById(menuId);
  const $triggerEl = document.getElementById(commentId);
  const dropdown = new Dropdown($targetEl, $triggerEl);
  dropdown.toggle();
};

const handleStoreComment = async () => {
  loadingStatus.value = true;
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  await axios.post("http://localhost:8000/api/comments", form, {
    headers: header,
  });
  form.commentContent = "";
  loadingStatus.value = false;
  watchComment.value = !watchComment.value;
  emits("reloadComments");
};

watch(watchComment, async () => {
  await postStore.getPostDetail(props.postId);
  posts.value = postStore.getPosts;
  comments.value = posts.value.commentDetails;
  emits("reloadComments");
});

onMounted(async () => {
  await userStore.authUser();
  users.value = userStore.getAuthUser;
  avatar.value = `http://localhost:8000/profileImages/${users.value.profileImage}`;
  form.userId = props.userId;
  form.postId = props.postId;
  comments.value = props.comments;
});
</script>
<template>
  <div class="flex flex-col w-full">
    <!-- form starts here -->
    <form @submit.prevent="handleStoreComment" class="flex items-center py-3">
      <!-- avatar starts here -->
      <div class="shrink-0">
        <img :src="avatar" class="w-10 h-10 rounded-full object-cover" alt="" />
      </div>
      <!-- avatar ends here -->
      <textarea
        v-model="form.commentContent"
        placeholder="Post your reply"
        class="resize-none border-none rounded-lg w-full bg-white focus:ring-white placeholder:text-lg text-lg dark:text-gray-300 no-scrollbar dark:bg-black dark:focus:ring-black"
        >{{ form.commentContent }}</textarea
      >

      <div class="">
        <button
          :disabled="form.commentContent === ''"
          type="submit"
          class="flex items-center px-5 py-2 disabled:bg-blue-200 text-white bg-blue-600 dark:disabled:bg-blue-600 dark:disabled:contrast-50 rounded-full"
        >
          <svg
            v-if="loadingStatus"
            aria-hidden="true"
            role="status"
            class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
              fill="#1C64F2"
            />
          </svg>
          Reply
        </button>
      </div>
    </form>
    <!-- form ends here -->
    <!-- comments start here -->
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="flex items-center gap-3 py-2 w-full border-y-[1px] border-y-slate-900/5 dark:border-y-[1px] dark:border-y-gray-700"
    >
      <!-- avatar starts -->
      <div class="shrink-0">
        <img
          :src="'http://localhost:8000/profileImages/' + comment.userProfile"
          class="w-8 mobile:w-10 h-8 mobile:h-10 rounded-full object-cover"
          alt=""
        />
      </div>
      <!-- avatar ends -->
      <div class="flex flex-col w-full space-x-2 items-start">
        <!-- user name -->
        <div class="flex items-center gap-1 w-full">
          <h3 class="font-bold dark:text-white">{{ comment.userName }}</h3>
          <span class="text-gray-500">@{{ comment.nickName }}</span>
          <!-- comment drop down -->
          <div class="ml-auto">
            <CommentEdit
              @update-comments="
                () => {
                  watchComment = !watchComment;
                }
              "
              :user-comment="comment"
              v-if="comment.userId === users.id"
            ></CommentEdit>
          </div>
        </div>
        <span class="text-[13px] text-gray-500">{{ comment.createdDate }}</span>
        <!-- user name ends -->
        <!-- content starts here -->
        <div class="flex flex-col w-full">
          <div class="max-w-[300px] mobile:w-full">
            <p class="dark:text-gray-300 max-w-[350px] break-words">
              {{ comment.commentContent }}
            </p>
          </div>
        </div>
        <!-- content ends here -->
      </div>
    </div>
  </div>
</template>
