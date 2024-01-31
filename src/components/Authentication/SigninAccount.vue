<script setup>
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import FloatingInput from "./FloatingInput.vue";
import Logo from "../Logo.vue";
import Google from "./Google.vue";
import Github from "./Github.vue";
const form = ref({
  email: "",
  password: "",
});

const handleLogin = () => {
  console.log(form.value);
};

onMounted(() => initFlowbite());
</script>
<template>
  <!-- modal button -->
  <div class="">
    <button
      data-modal-target="sign-in-modal"
      data-modal-toggle="sign-in-modal"
      class="w-[200px] px-10 hover:bg-blue-300 duration-300 py-2 ring-1 ring-blue-400 text-blue-500 rounded-full"
    >
      Sign in
    </button>
  </div>
  <!-- Main modal -->
  <Teleport to="body">
    <div
      id="sign-in-modal"
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
            data-modal-hide="sign-in-modal"
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
            <form
              @submit.prevent="handleLogin()"
              class="w-full p-5 flex flex-col max-w-[450px] gap-5"
            >
              <h3 class="font-bold text-2xl">Sign in to X</h3>
              <Google></Google>
              <Github></Github>
              <FloatingInput
                label="Email"
                type="email"
                input-id="siginEmail"
                v-model:modal-value="form.email"
              ></FloatingInput>

              <FloatingInput
                label="Password"
                type="password"
                input-id="signinPassword"
                v-model:modal-value="form.password"
              ></FloatingInput>

              <div class="flex justify-center">
                <button
                  type="submit"
                  class="px-5 py-2 w-[200px] font-bold bg-blue-500 text-white rounded-full"
                >
                  Sign in
                </button>
              </div>
              <div class="flex justify-center">
                <button
                  class="px-5 py-2 w-[200px] font-bold bg-white ring-1 ring-slate-300 hover:bg-gray-200 duration-300 text-slate-900 rounded-full"
                >
                  Forget Password
                </button>
              </div>
              <div class="flex justify-center">
                <span class="dark:text-gray-300">Don't have an account yet <a class="text-blue-500">Sign up</a></span>
              </div>
            </form>
          </div>
          <!-- login form -->
        </div>
      </div>
    </div>
  </Teleport>
</template>
