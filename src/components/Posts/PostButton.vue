<script setup>
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import IconInput from "../IconInput.vue";
const imgIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>`;
const gifIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"></path></g></svg>`;
const pollIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"></path></g></svg>`;
const emojiIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"></path></g></svg>`;
const eventIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"></path></g></svg>`;
const locationIcon = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(29, 155, 240);"><g><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path></g></svg>`;
const form = ref({
  content : '',
  media : '',
});
const imgUrl = ref([]);
const gridCols = ref("grid-cols-1");
const imgRatio = ref(""); //to control image preview style
const imgContainer = ref("");

// preview image
function previewImage(payload){
  form.value.media = payload;
  imgUrl.value = [];
  let imageFiles = form.value.media;
  for(let i = 0 ; i < imageFiles.length ; i++){
    imgUrl.value.push(URL.createObjectURL(imageFiles[i]));
  }
  if (imgUrl.value.length == 1) {
    imgContainer.value = 'mobile:w-[400px]';
    gridCols.value = "grid-cols-1";
    imgRatio.value = "";
  } else if (imgUrl.value.length > 1) {
    imgContainer.value = '';
    gridCols.value = "grid-cols-2";
    imgRatio.value = "aspect-square h-[200px]";
  }
}
function removeImage(){
  form.value.media = '';
  imgUrl.value = [];
}
onMounted(() => initFlowbite());
</script>
<template>
  <!-- Post button laptop size -->
  <button
    type="button"
    data-modal-target="default-modal"
    data-modal-toggle="default-modal"
    class="hidden xl:block my-2 px-20 py-4 rounded-full bg-blue-600 font-bold hover:bg-blue-700 duration-300 text-white"
  >
    Post
  </button>

  <!-- post button mobile size -->
  <button
    type="button"
    data-modal-target="default-modal"
    data-modal-toggle="default-modal"
    class="block xl:hidden p-2 rounded-full bg-blue-600 text-gray-200"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      class="w-6 h-6 fill-white r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1472mwg r-lrsllp"
    >
      <g>
        <path
          d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"
        ></path>
      </g>
    </svg>
  </button>

  <!-- modal -->
  <Teleport to="body">
    <div
      id="default-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed  top-0 right-0 left-0 z-50 justify-center items-center w-full  h-screen mobile:h-full max-h-full"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div
          class="relative bg-white rounded-lg shadow dark:bg-black"
        >
        <!-- dissmisss button -->
          <button
            type="button"
            class="text-gray-400  rounded-full p-1 bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ms-1 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
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
          <div class="flex flex-col my-2 py-2">
            <!-- avatar and textarea flex -->
            <div class="flex items-start px-3">
              <!-- avatar -->
              <div class="p-2">
                <img
                  src="../../../public/Images/minj.jpg"
                  class="w-10 h-10 rounded-full object-cover"
                  alt=""
                />
              </div>
              <!-- avatar ends -->
             
              <!-- text area -->
              <textarea
                rows="2"
                class="w-full  resize-none py-2 border-none bg-white focus:ring-white placeholder:text-lg text-lg dark:text-gray-300 no-scrollbar dark:bg-black dark:focus:ring-black"
                placeholder="What is happening?!"
              ></textarea>
              <!-- text area ends -->
            </div>
            <!-- image preview starts here -->
            <div v-if="imgUrl.length != 0" :class="['relative grid px-4 w-full gap-4 rounded-2xl overflow-hidden', gridCols]">
              <div :class="['relative rounded-2xl overflow-hidden',imgContainer]" v-for="url in imgUrl" >
                <img
                  :src="url"
                  :class="['w-full object-cover duration-300 rounded-2xl', imgRatio]"
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
                  input-id="modalId"
                  @image-files="previewImage"
                ></IconInput>
                <IconInput :label-icon="gifIcon"></IconInput>
                <IconInput :label-icon="pollIcon"></IconInput>
                <IconInput :label-icon="emojiIcon"></IconInput>
                <IconInput :label-icon="eventIcon"></IconInput>
                <IconInput :label-icon="locationIcon"></IconInput>
              </div>
              <div class="ml-auto">
                <button class="px-5 py-1 text-white bg-blue-600 rounded-full">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
