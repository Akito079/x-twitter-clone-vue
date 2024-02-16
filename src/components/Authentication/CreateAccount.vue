<script setup>
import { ref, onMounted, computed } from "vue";
import { initFlowbite, Modal } from "flowbite";
import Logo from "../Logo.vue";
import FloatingInput from "@/components/Authentication/FloatingInput.vue";
import { useAuthStore } from "@/stores/auth";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";

const authStore = useAuthStore();
const serverMessages = ref(null);
const serverClass = ref("");
const form = ref({
  name: "",
  nickName: "",
  email: "",
  profileImage: "",
  password: "",
  passwordConfirm: "",
});

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("A Name is required", required),
      minLength: helpers.withMessage(
        "A Name must contain atleast 4 characters",
        minLength(4)
      ),
      maxLength: helpers.withMessage(
        "A Name must contain 10 characters atmost",
        maxLength(12)
      ),
    },
    nickName: {
      required: helpers.withMessage("A Nick Name is required", required),
      minLength: helpers.withMessage(
        "A Nick Name must contain atleast 4 characters",
        minLength(4)
      ),
      maxLength: helpers.withMessage(
        "A Nick Name must contain 10 characters atmost",
        maxLength(12)
      ),
    },
    email: {
      required: helpers.withMessage("An email is required", required),
      email: helpers.withMessage("The email must be a valid email", email),
    },
    profileImage: {
      required: helpers.withMessage(
        "Please choose a profile picture",
        required
      ),
    },
    password: {
      required: helpers.withMessage("An password is required", required),
      minLength: helpers.withMessage(
        "A password must contain atleast 6 characters",
        minLength(6)
      ),
      maxLength: helpers.withMessage(
        "A password must contain 12 characters atmost",
        maxLength(12)
      ),
    },
    passwordConfirm: {
      required: helpers.withMessage("Please Confirm your password", required),
      sameAs: helpers.withMessage(
        "The Password does not match.Please,Try again",
        sameAs(form.value.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form.value);

const uploadProfileImage = (event) => {
  const files = event.target.files[0];
  form.value.profileImage = files;
};

const handleRegister = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      await authStore.signUp(form.value);
      serverMessages.value = ["Registeration is successful"];
      serverClass.value = "text-emerald-500";
      const modalElement = document.querySelector("#create-account-modal");
      const modal = new Modal(modalElement);
      modal.hide();
    } catch (error) {
      console.log(error);
      serverMessages.value = error.response.data.errors;
      serverClass.value = "text-red-500";
    }
  }
};
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
          <!-- modal close button -->
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <form
              @submit.prevent="handleRegister()"
              class="w-full p-5 flex flex-col max-w-[450px] gap-5"
            >
              <h3 class="font-bold text-2xl dark:text-gray-300">
                Create Your Account
              </h3>
              <!-- show server message -->
              <p
                v-if="serverMessages != null"
                v-for="serverMessage in serverMessages"
                :key="serverMessage.id"
                :class="[
                  'px-5 py-2 bg-gray-200 dark:bg-slate-900 text-red-500 rounded-lg',
                  serverClass,
                ]"
              >
                {{ serverMessage }}
              </p>
              <!-- form inputs -->
              <!-- profile picture -->
              <input
                @change="uploadProfileImage"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                accept="image/png, image/jpg, image/jpeg,image/webp"
                type="file"
              />
              <div>
                <FloatingInput
                  label="Name"
                  v-model:modal-value="form.name"
                  type="text"
                  input-id="userName"
                ></FloatingInput>
                <span
                  v-if="v$.name.$error"
                  v-for="error in v$.name.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div>
                <FloatingInput
                  label="Nick Name"
                  v-model:modal-value="form.nickName"
                  type="text"
                  input-id="nickName"
                ></FloatingInput>
                <span
                  v-if="v$.nickName.$error"
                  v-for="error in v$.nickName.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div>
                <FloatingInput
                  label="Email"
                  v-model:modal-value="form.email"
                  type="email"
                  input-id="userEmail"
                ></FloatingInput>
                <span
                  v-if="v$.email.$error"
                  v-for="error in v$.email.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div>
                <FloatingInput
                  label="Password"
                  v-model:modal-value="form.password"
                  type="password"
                  input-id="password"
                ></FloatingInput>
                <span
                  v-if="v$.password.$error"
                  v-for="error in v$.password.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div>
                <FloatingInput
                  label="Confirm-password"
                  v-model:modal-value="form.passwordConfirm"
                  type="password"
                  input-id="passwordConfirm"
                ></FloatingInput>
                <span
                  v-if="v$.passwordConfirm.$error"
                  v-for="error in v$.passwordConfirm.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="px-5 py-2 bg-blue-500 text-white rounded-full"
                >
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
