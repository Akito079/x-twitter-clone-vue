<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import LeftSideBar from "@/components/Navbars/LeftSideBar.vue";
import RightSideBar from "@/components/Navbars/RightSideBar.vue";
import NavBar from "@/components/Navbars/NavBar.vue";
import FooterNav from "@/components/Navbars/FooterNav.vue";
import ChangePassword from "@/components/Account/ChangePassword.vue";
import { initDrawers } from "flowbite";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/posts";
import { useRouter } from "vue-router";
import axios from "axios";
//mobile responsive effects
const position = ref("");
const contrast = ref("");
const userStore = useAuthStore();
const postStore = usePostStore();
const router = useRouter();
const user = ref();
let preScrollPos = window.scrollY;
window.onscroll = function () {
  let currentScrollPos = window.scrollY;
  if (preScrollPos > currentScrollPos) {
    position.value = "top-0";
    contrast.value = "opacity-100";
  } else {
    position.value = "-top-[100px]";
    contrast.value = "opacity-50";
  }
  preScrollPos = currentScrollPos;
};

const deleteAccount =  () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You want to delete this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
        });
        //  handle deleting account
        let token = localStorage.getItem("token");
        let header = {
          Authorization: `Bearer ${token}`,
        };
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        await axios.delete(`http://localhost:8000/api/users/${user.value.id}`, {
          headers: header,
        });
        postStore.emptyPosts();
        localStorage.removeItem("token");
        router.push("/login");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "",
          icon: "error",
        });
      }
    });
};
onMounted(async () => {
  initDrawers();
  await userStore.authUser();
  user.value = userStore.getAuthUser;
});
</script>
<template>
  <!-- main wrapper for all content -->
  <section
    class="flex flex-col mobile:flex-row mobile:justify-center dark:bg-[#191919]"
  >
    <!-- mobile size navbar starts here -->
    <div
      id="navbar"
      class="mobile:hidden duration-300 backdrop-blur-lg sticky w-full"
      :class="position"
    >
      <NavBar></NavBar>
    </div>
    <!-- mobile size nabar ends here -->

    <!-- left side navbars -->
    <LeftSideBar></LeftSideBar>

    <!-- new feed starts here  -->
    <div class="w-full mobile:w-[750px]">
      <!-- posts start here -->
      <div class="w-full min-h-screen py-4 gap-5 flex flex-col">
        <h3 class="text-lg px-4 font-medium dark:text-gray-400">
          Your Account
        </h3>
        <p class="text-sm px-4 dark:text-gray-400">
          See information about your account, download an archive of your data,
          or learn about your account deactivation options
        </p>
        <div
          class="flex gap-5 hover:bg-gray-200 dark:hover:bg-slate-800 duration-300 py-2 px-4 items-center"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="w-6 h-6 dark:fill-gray-300"
          >
            <g>
              <path
                d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"
              ></path>
            </g>
          </svg>
          <div class="">
            <h3 class="dark:text-gray-300">Account Information</h3>
            <p class="dark:text-gray-300">
              See your account information like your phone number and email
              address
            </p>
          </div>
        </div>
        <ChangePassword></ChangePassword>
        <div
          @click="deleteAccount"
          class="flex gap-5 hover:bg-gray-200 dark:hover:bg-slate-800 duration-300 py-2 px-4 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 dark:fill-gray-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          <div class="">
            <h3 class="dark:text-gray-300">Delete Account</h3>
            <p class="dark:text-gray-300">
              Delete your account once and for all
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- right side bar -->
    <RightSideBar
      :search-status="true"
      :trend-status="true"
      :folllow-status="true"
    ></RightSideBar>

    <!-- footer nav -->
    <div
      class="mobile:hidden sticky bottom-0 flex justify-between px-5 py-2 bg-white duration-300 dark:bg-black ring-1 ring-slate-900/5 dark:ring-gray-500 items-center col-span-6 w-full"
      :class="contrast"
    >
      <FooterNav />
    </div>
  </section>
</template>
