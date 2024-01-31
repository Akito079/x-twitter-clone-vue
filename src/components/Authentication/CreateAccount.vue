<script setup>
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import Logo from "../Logo.vue";
import FloatingInput from "@/components/Authentication/FloatingInput.vue";
const form = ref({
  name: "",
  nickName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = () => {
  console.log(form.value);
}

onMounted(() => initFlowbite());
</script>
<template>
  <!-- modal button -->
  <div class="">
    <button
      data-modal-target="create-account-modal"
      data-modal-toggle="create-account-modal"
      class="px-10 py-2 bg-blue-500 rounded-full font-bold text-white"
    >
      Create account
    </button>
  </div>
  <!-- Main modal -->
  <Teleport to="body">
    <div
      id="create-account-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-slate-900">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="create-account-modal"
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
          <div class="flex flex-col items-center">
            <Logo size="w-10 h-10"></Logo>
            <form @submit.prevent="handleRegister()" class="w-full p-5 flex flex-col max-w-[450px] gap-5">
              <h3 class="font-bold text-2xl dark:text-gray-300">Create Your Account</h3>
              <FloatingInput
                label="Name"
                v-model:modal-value="form.name"
                type="text"
                input-id="userName"
              ></FloatingInput>
              <FloatingInput
                label="Nick Name"
                v-model:modal-value="form.nickName"
                type="text"
                input-id="nickName"
              ></FloatingInput>
              <FloatingInput
                label="Email"
                v-model:modal-value="form.email"
                type="email"
                input-id="userEmail"
              ></FloatingInput>
              <FloatingInput
                label="Password"
                v-model:modal-value="form.password"
                type="password"
                input-id="password"
              ></FloatingInput>
              <FloatingInput
                label="Confirm-password"
                v-model:modal-value="form.confirmPassword"
                type="password"
                input-id="confirmPassword"
              ></FloatingInput>
              <div class="flex justify-end">
                <button type="submit" class="px-5 py-2 bg-blue-500 text-white rounded-full">
                  Create Account
                </button>
              </div>
            </form>
          </div>
          <!-- login form -->
        </div>
      </div>
    </div>
  </Teleport>
</template>
