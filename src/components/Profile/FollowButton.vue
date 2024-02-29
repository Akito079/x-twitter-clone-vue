<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const follow = ref(false);
const props = defineProps({ followStatus: Boolean, userId: Number });
const followUser = async () => {
  follow.value = !follow.value;
  try {
    let token = localStorage.getItem("token");
    const header = {
      Authorization: `Bearer ${token}`,
    };
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    await axios.post(
      "http://localhost:8000/api/followers",
      { userId: props.userId },
      { headers: header }
    );
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  follow.value = props.followStatus;
});
</script>
<template>
  <button
    v-if="!follow"
    @click="followUser"
    class="w-[120px] px-4 py-2 bg-slate-900 rounded-full text-gray-200 dark:bg-blue-600"
  >
    Follow
  </button>
  <button
    v-else
    @click="followUser"
    class="w-[120px] px-4 py-2 bg-slate-900 rounded-full text-gray-200 dark:bg-blue-600"
  >
    Following
  </button>
</template>
