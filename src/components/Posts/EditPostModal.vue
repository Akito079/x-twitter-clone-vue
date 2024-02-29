<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {  Modal } from "flowbite";
import Swal from "sweetalert2";
import IconInput from "../IconInput.vue";
import { usePostStore } from "@/stores/posts";
import useVuelidate from "@vuelidate/core";
import { maxLength, helpers,required } from "@vuelidate/validators";
const imgIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>`;
const gifIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path></g></svg>`;
const pollIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path></g></svg>`;
const emojiIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g></svg>`;
const eventIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path></g></svg>`;
const locationIcon = `<svg viewBox="0 0 24 24"  aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g></svg>`;
const post = ref([]);
const form = reactive({
  content: "",
  media: "",
  userId: "",
});
const rules = computed(() => {
  return {
    content: {
      maxLength: helpers.withMessage(
        "The content has exceeded the characters limits",
        maxLength(200)
      ),
    },
    media: {
      maxLength: helpers.withMessage(
        "You can only add 4 images at most in a post",
        maxLength(4)
      ),
    },
    userId: {},
  };
});
const v$ = useVuelidate(rules, form);
const postStore = usePostStore();
const loadingStatus = ref(false);
const imgUrl = ref([]);
const gridCols = ref("");
const imgRatio = ref(""); //to control image preview style
const imgContainer = ref("");
const props = defineProps(["postId", "userId", "userProfile"]);
const emits = defineEmits(["updatedPost"]);

const openModal = () => {
  const modalElement = document.querySelector("#edit-post-modal");
  const modal = new Modal(modalElement);
  modal.show();
};

const closeModal = () => {
  const modalElement = document.querySelector("#edit-post-modal");
  const modal = new Modal(modalElement);
  modal.hide();
};

// preview image
function previewImage(payload) {
  form.media = payload;
  imgUrl.value = [];
  let imageFiles = form.media;
  if(imageFiles.length <= 4){
    for (let i = 0; i < imageFiles.length; i++) {
      imgUrl.value.push(URL.createObjectURL(imageFiles[i]));
    }
    if (imgUrl.value.length == 1) {
      imgContainer.value = "mobile:w-[400px]";
      gridCols.value = "grid-cols-1";
      imgRatio.value = "max-h-[500px]";
    } else if (imgUrl.value.length > 1) {
      imgContainer.value = "";
      gridCols.value = "grid-cols-2";
      imgRatio.value = "aspect-square h-[200px]";
    }
  }else{
    Swal.fire({
      title: "",
      text: "You can only add 4 images at most in a post",
      icon: "error",
      confirmButtonText: "Okay",
      confirmButtonColor: "rgb(28 100 242)",
    });
  }
}
function removeImage() {
  form.media = "";
  imgUrl.value = [];
}

const handlepostUpdate = async () => {
  try {
    const result = await v$.value.$validate();
    if (result) {
      loadingStatus.value = true;
      await postStore.postUpdate(props.postId, form);
      emits("updatedPost");
      loadingStatus.value = false;
      const modalElement = document.querySelector("#edit-post-modal");
      const modal = new Modal(modalElement);
      modal.hide();
    }
  } catch (error) {
    loadingStatus.value = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please try again later",
    });
  }
};

onMounted(async () => {
  form.userId = props.userId;
  await postStore.getPostDetail(props.postId);
  post.value = postStore.getPosts;
  form.media = post.value.media;
  form.content = post.value.content;
  for (let i = 0; i < post.value.media.length; i++) {
    imgUrl.value.push(
      `http://localhost:8000/postImages/${post.value.media[i]}`
    );
  }
  if (imgUrl.value.length == 1) {
    imgContainer.value = "mobile:w-[400px]";
    gridCols.value = "grid-cols-1";
    imgRatio.value = "max-h-[500px]";
  } else if (imgUrl.value.length > 1) {
    imgContainer.value = "";
    gridCols.value = "grid-cols-2";
    imgRatio.value = "aspect-square h-[200px]";
  }
});
</script>
<template>
  <!-- Post button laptop size -->
  <button
    @click="openModal"
    type="button"
    data-modal-target="edit-post-modal"
    data-modal-toggle="edit-post-modal"
    class="flex w-full items-center gap-2 font-bold px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
  >
    <svg
      data-slot="icon"
      class="w-5 h-5"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      ></path>
    </svg>
    Edit
  </button>

  <!-- modal -->
  <Teleport to="body">
    <div
      id="edit-post-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-screen mobile:h-full max-h-full"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-black">
          <!-- dissmisss button -->
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 rounded-full p-1 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ms-1 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="edit-post-modal"
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
            <span class="sr-only">Close modal</span>
          </button>
          <form
            @submit.prevent="handlepostUpdate"
            class="flex flex-col my-2 py-2"
          >
            <!-- avatar and textarea flex -->
            <div class="flex items-start px-3">
              <!-- avatar -->
              <div class="p-2">
                <img
                  :src="
                    'http://localhost:8000/profileImages/' + props.userProfile
                  "
                  class="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
              </div>
              <!-- avatar ends -->

              <!-- text area -->
              <textarea
                v-model="form.content"
                class="w-full resize-none py-2 border-none bg-white focus:ring-white placeholder:text-lg text-lg dark:text-gray-300 no-scrollbar dark:bg-black dark:focus:ring-black"
                placeholder="What is happening?!"
                >{{ post.content }}</textarea
              >
              <!-- text area ends -->
            </div>
            <!-- image preview starts here -->
            <div
              v-if="imgUrl.length != 0"
              :class="[
                'relative grid px-4 w-full gap-4 rounded-2xl overflow-hidden',
                gridCols,
              ]"
            >
              <div
                :class="['relative rounded-2xl overflow-hidden', imgContainer]"
                v-for="url in imgUrl"
              >
                <img
                  :src="url"
                  :class="[
                    'w-full object-cover duration-300 rounded-2xl',
                    imgRatio,
                  ]"
                  alt=""
                />
                <div
                  @click="removeImage"
                  class="p-2 bg-slate-900 rounded-full absolute top-1 right-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="w-6 h-6 fill-gray-300 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hjwoze r-12ym1je"
                    style="color: rgb(255, 255, 255)"
                  >
                    <g>
                      <path
                        d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <!-- image preview ends here -->
            <!-- File input flex -->
            <div class="flex items-center px-4 my-2">
              <div class="flex items-center gap-2 sm:gap-5">
                <IconInput
                  :label-icon="imgIcon"
                  type="file"
                  input-id="edit-post"
                  @image-files="previewImage"
                ></IconInput>
                <IconInput :label-icon="gifIcon"></IconInput>
                <IconInput :label-icon="pollIcon"></IconInput>
                <IconInput :label-icon="emojiIcon"></IconInput>
                <IconInput :label-icon="eventIcon"></IconInput>
                <IconInput :label-icon="locationIcon"></IconInput>
              </div>
              <div class="ml-auto">
                <button
                  type="submit"
                  :disabled="form.content === '' && form.media === ''"
                  class="flex items-center px-5 py-2 disabled:bg-blue-300 dark:disabled:bg-blue-600 dark:disabled:contrast-50 text-white bg-blue-600 rounded-full"
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
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>
