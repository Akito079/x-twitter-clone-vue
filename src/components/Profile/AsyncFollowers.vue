<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { useRouter } from "vue-router";
import FollowButton from "./FollowButton.vue";
const userStore = useAuthStore();
const users = ref([]);
const router = useRouter();
const userLists = ref([]);
const authUser = ref([]);

const getFollowers = async () => {
  let token = localStorage.getItem("token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  await axios.get("http://localhost:8000/sanctum/csrf-cookie");
  const response = await axios.get("http://localhost:8000/api/users", {
    headers: header,
  });
  users.value = response.data.data;
  await userStore.authUser();
  authUser.value = userStore.getAuthUser;
  let id = authUser.value.id;
  userLists.value = users.value.filter((user) => {
    return user.id != id;
  });
};
await getFollowers();
</script>
<template>
  <div
    class="flex flex-col min-h-screen gap-1 pt-2 overflow-hidden rounded-xl duration-300 dark:bg-slate-900 dark:text-gray-200"
  >
    <div
      v-for="user in userLists"
      :key="user.id"
      class="flex item-center gap-2 px-4 py-2 rounded-2xl duration-300 hover:bg-gray-200 dark:hover:bg-slate-800"
    >
      <div class="shrink-0">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :src="'http://localhost:8000/profileImages/' + user.profileImage"
        />
      </div>
      <div class="flex flex-col">
        <h3
          @click="
            router.push({ name: 'userView', params: { userId: user.id } })
          "
          class="font-bold"
        >
          {{ user.name }}
        </h3>
        <span class="text-gray-500">@{{ user.nickName }}</span>
      </div>
      <div class="ml-auto">
        <FollowButton
          :follow-status="user.isFollowed"
          :user-id="user.id"
        ></FollowButton>
      </div>
    </div>
  </div>
</template>
