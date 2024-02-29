<script setup>
import { ref, computed } from "vue";
import { initFlowbite, Modal } from "flowbite";
import FloatingInput from "./FloatingInput.vue";
import Logo from "../Logo.vue";
import Google from "./Google.vue";
import Github from "./Github.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
  helpers,
} from "@vuelidate/validators";

const authStore = useAuthStore();
const serverMessages = ref(null);
const router = useRouter();
const form = ref({
  email: "",
  password: "",
});
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(
        "Please enter your email address",
        required
      ),
      email: helpers.withMessage("Please enter a valid email address", email),
    },
    password: {
      required: helpers.withMessage("Please enter the password", required),
      minLength: helpers.withMessage(
        "A password must contain atleast 6 characters",
        minLength(6)
      ),
      maxLength: helpers.withMessage(
        "A password must contain 12 characters at most",
        maxLength(12)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form.value);

const handleLogin = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      await authStore.signIn(form.value);
      closeModal();
      router.push("/");
    } catch (error) {
      serverMessages.value = error.response.data.message;
      console.log(error);
    }
  }
};

const openModal = () => {
    const modalElement = document.querySelector("#sign-in-modal");
    const modal = new Modal(modalElement);
    modal.show();
  };

  const closeModal = () => {
    const modalElement = document.querySelector("#sign-in-modal");
    const modal = new Modal(modalElement);
    modal.hide();
  };

</script>
<template>
  <!-- modal button -->
  <div class="">
    <button
      @click="openModal"
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
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

              <!-- showing message from server -->
              <p
                v-if="serverMessages != null"
                class="px-5 py-2 text-red-500 rounded-lg bg-gray-200 dark:bg-slate-900"
              >
                {{ serverMessages }}
              </p>
              <div>
                <FloatingInput
                  label="Email"
                  type="email"
                  input-id="siginEmail"
                  v-model:modal-value="form.email"
                ></FloatingInput>
                <span
                  v-if="v$.email.$errors"
                  v-for="error in v$.email.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}
                </span>
              </div>

              <div>
                <FloatingInput
                  label="Password"
                  type="password"
                  input-id="signinPassword"
                  v-model:modal-value="form.password"
                ></FloatingInput>
                <span
                  v-if="v$.password.$errors"
                  v-for="error in v$.password.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}
                </span>
              </div>

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
                <button class="dark:text-gray-300">
                  Don't have an account yet <a class="text-blue-500">Sign up</a>
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
