<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import axios from "axios";
import { Modal, initModals } from "flowbite";
import Swal from "sweetalert2";
import FloatingInput from "../Authentication/FloatingInput.vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/posts";
import { useRouter } from "vue-router";
const userStore = useAuthStore();
const postStore = usePostStore();
const router = useRouter();
const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const rules = computed(() => {
  return {
    oldPassword: {
      required: helpers.withMessage("Please fill old password", required),
      minLength: helpers.withMessage(
        "A password must contain atleast 6 characters",
        minLength(6)
      ),
      maxLength: helpers.withMessage(
        "A password must contain 12 characters atmost",
        maxLength(12)
      ),
    },
    newPassword: {
      required: helpers.withMessage("Please enter new password", required),
      minLength: helpers.withMessage(
        "A password must contain atleast 6 characters",
        minLength(6)
      ),
      maxLength: helpers.withMessage(
        "A password must contain 12 characters atmost",
        maxLength(12)
      ),
    },
    confirmPassword: {
      required: helpers.withMessage("Please enter new password", required),
      sameAs: helpers.withMessage(
        "The Password does not match with the new password.Please,Try again",
        sameAs(form.newPassword)
      ),
    },
  };
});
const loadingStatus = ref(false);
const serverMessages = ref(null);
const serverClass = ref("");
const v$ = useVuelidate(rules, form);
const openModal = () => {
  const modalElement = document.querySelector("#change-password-modal");
  const modal = new Modal(modalElement);
  modal.show();
};
const closeModal = () => {
  const modalElement = document.querySelector("#change-password-modal");
  const modal = new Modal(modalElement);
  modal.hide();
};
const handleChangePassword = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      loadingStatus.value = true;
      let token = localStorage.getItem("token");
      const header = {
        Authorization: `Bearer ${token}`,
      };

      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://localhost:8000/api/changePassword",
        form,
        { headers: header }
      );
      loadingStatus.value = false;
      closeModal();
      await userStore.signOut();
      postStore.emptyPosts();
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      loadingStatus.value = false;
      console.log(error);
      serverMessages.value = error.response.data.message;
      serverClass.value = "text-red-500";
    }
  }
};
onMounted(() => {
  initModals();
});
</script>
<template>
  <div
    @click="openModal"
    data-modal-target="change-password-modal"
    data-modal-toggle="change-password-modal"
    class="flex gap-5 hover:bg-gray-200 duration-300 dark:hover:bg-slate-800 py-2 px-4 items-center"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      class="w-6 h-6 dark:fill-gray-300"
    >
      <g>
        <path
          d="M13 9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm9.14 1.77l-5.83 5.84-4-1L6.41 22H2v-4.41l5.89-5.9-1-4 5.84-5.83 7.06 2.35 2.35 7.06zm-12.03 1.04L4 18.41V20h1.59l6.1-6.11 4 1 4.17-4.16-1.65-4.94-4.94-1.65-4.16 4.17 1 4z"
        ></path>
      </g>
    </svg>
    <div class="">
      <h3 class="dark:text-gray-300">ChangePassword</h3>
      <p class="dark:text-gray-300">Change your password anytime,anywhere</p>
    </div>
  </div>

  <Teleport to="body">
    <div
      id="change-password-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-slate-900">
          <!-- modal close button -->
          <button
            @click="closeModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="change-password-modal"
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
            <form
              @submit.prevent="handleChangePassword"
              class="w-full p-5 flex flex-col max-w-[450px] gap-5"
            >
              <h3 class="font-bold text-2xl dark:text-gray-300">
                Change your password
              </h3>
              <!-- show server message -->
              <p
                v-if="serverMessages != null"
                :class="[
                  'px-5 py-2 bg-gray-200 dark:bg-slate-900 text-red-500 rounded-lg',
                  serverClass,
                ]"
              >
                {{ serverMessages }}
              </p>
              <!-- form inputs -->
              <!-- profile picture -->

              <div>
                <FloatingInput
                  label="Old Password"
                  v-model:modal-value="form.oldPassword"
                  type="password"
                  input-id="oldPassword"
                ></FloatingInput>
                <span
                  v-if="v$.oldPassword.$error"
                  v-for="error in v$.oldPassword.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div>
                <FloatingInput
                  label="New Password"
                  v-model:modal-value="form.newPassword"
                  type="password"
                  input-id="newPassword"
                ></FloatingInput>
                <span
                  v-if="v$.newPassword.$error"
                  v-for="error in v$.newPassword.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div>
                <FloatingInput
                  label="Confirm Password"
                  v-model:modal-value="form.confirmPassword"
                  type="password"
                  input-id="confirmPassword"
                ></FloatingInput>
                <span
                  v-if="v$.confirmPassword.$error"
                  v-for="error in v$.confirmPassword.$errors"
                  :key="error.$uid"
                  class="text-sm text-red-500"
                  >{{ error.$message }}</span
                >
              </div>
              <div class="flex justify-end">
                <button
                  :disabled="
                    form.oldPassword === '' &&
                    form.newPassword === '' &&
                    form.confirmPassword === ''
                  "
                  type="submit"
                  class="px-5 py-2 disabled:bg-blue-200 dark:disabled:bg-blue-600 dark:disabled:contrast-50 bg-blue-500 text-white rounded-full"
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
                  Change Password
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
