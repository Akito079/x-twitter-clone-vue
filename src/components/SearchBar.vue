<script setup>
import { ref } from 'vue';
const searchQuery = ref('');
const buttonStatus = ref(false);
function dismissButton(){
  if(searchQuery.value != null){
    buttonStatus.value = true;
  }
}
function clearQuery(){
  searchQuery.value = '';
  buttonStatus.value = false;
}

function handleSearch(){
  alert("hello");
}
</script>
<template>
  <div class=" py-2 flex items-center relative">
    <form @submit.prevent="handleSearch">
      <label for="search" class="absolute top-1/2 -translate-y-1/2 left-5"
        ><svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="w-5 h-5 dark:fill-gray-300 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-lwhw9o r-cnnz9e"
        >
          <g>
            <path
              d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
            ></path>
          </g></svg
      ></label>
      <input
        type="text"
        v-model="searchQuery"
        @input="dismissButton"
        class="w-full px-12 py-2 rounded-full outline-none decoration-none duration-300 focus:bg-gray-100 bg-gray-200 border-none dark:focus:bg-slate-700  dark:bg-slate-800  dark:text-gray-300 dark:placeholder:text-gray-300"
        id="search"
        placeholder="Search"
      />
      <span v-if="buttonStatus" class="p-1 bg-blue-400 rounded-full absolute right-16 top-1/2 -translate-y-1/2"
        ><svg
          @click="clearQuery"
          viewBox="0 0 15 15"
          aria-hidden="true"
          class="w-3 h-3 fill-gray-200  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-3xi3v6 r-1or9b2r r-5soawk"
        >
          <g>
            <path
              d="M6.09 7.5L.04 1.46 1.46.04 7.5 6.09 13.54.04l1.42 1.42L8.91 7.5l6.05 6.04-1.42 1.42L7.5 8.91l-6.04 6.05-1.42-1.42L6.09 7.5z"
            ></path>
          </g></svg
      ></span>
    </form>
  </div>
</template>
