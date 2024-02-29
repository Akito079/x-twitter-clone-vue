<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { Modal } from "flowbite";
import FloatingInput from "@/components/Authentication/FloatingInput.vue";
import IconInput from "../IconInput.vue";
import { useAuthStore } from "@/stores/auth";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
const user = ref([]);
const avatar = ref("");
const serverMessages = ref([]);
const serverClass = ref("");
const loadingStatus = ref(false);
const emits = defineEmits(["reloadProfile"]);
const camera = `<svg viewBox="0 0 24 24" aria-hidden="true" class="w-8 h-8 duration-300 fill-blue-400 rounded-full hover:bg-blue-500 hover:fill-gray-100 p-1 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03" style="color: rgb(255, 255, 255);"><g><path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path></g></svg>`;
const userStore = useAuthStore();
const form = reactive({
  name: "",
  nickName: "",
  email: "",
  profileImage: "",
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
    profileImage: {},
  };
});
const v$ = useVuelidate(rules, form);

const changeAvatar = (image) => {
  form.profileImage = image[0];
  avatar.value = URL.createObjectURL(form.profileImage);
};
const openModal = () => {
  const modalElement = document.querySelector("#profile-edit-modal");
  const modal = new Modal(modalElement);
  loadingStatus.value = false;
  modal.show();
};

const closeModal = () => {
  const modalElement = document.querySelector("#profile-edit-modal");
  const modal = new Modal(modalElement);
  loadingStatus.value = false;
  modal.hide();
};
const handleProfileEdit = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      loadingStatus.value = true;
      await userStore.profileEdit(form);
      const modalElement = document.querySelector("#profile-edit-modal");
      const modal = new Modal(modalElement);
      loadingStatus.value = false;
      modal.hide();
      emits("reloadProfile");
      serverMessages.value = "";
    } catch (error) {
      loadingStatus.value = false;
      serverMessages.value = error.response.data.errors;
      serverClass.value = "text-red-500";
    }
  }
};

onMounted(async () => {
  await userStore.authUser();
  user.value = userStore.getAuthUser;
  avatar.value = `http://localhost:8000/profileImages/${user.value.profileImage}`;
  form.name = user.value.name;
  form.nickName = user.value.nickName;
  form.email = user.value.email;
});
</script>
<template>
  <div class="">
    <button
      @click="openModal"
      data-modal-target="profile-edit-modal"
      data-modal-toggle="profile-edit-modal"
      class="px-5 py-2 font-bold rounded-full ring-1 ring-slate-900/40 dark:ring-gray-300 dark:text-gray-300"
    >
      Edit profile
    </button>
  </div>

  <!-- Main modal -->
  <Teleport to="body">
    <div
      id="profile-edit-modal"
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
            data-modal-hide="profile-edit-modal"
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
            <div>
              <h3 class="text-lg font-bold">Edit your profile</h3>
            </div>
            <form
              @submit.prevent="handleProfileEdit"
              class="w-full p-5 flex flex-col max-w-[450px] gap-5"
            >
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
              <!-- update profile picture -->
              <div class="w-16">
                <div class="relative">
                  <img
                    class="w-16 h-16 rounded-full object-cover"
                    :src="avatar"
                    alt=""
                  />
                  <div
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <IconInput
                      @image-files="changeAvatar"
                      :label-icon="camera"
                      type="file"
                      input-id="profileEdit"
                    ></IconInput>
                  </div>
                </div>
              </div>
              <div>
                <FloatingInput
                  label="Name"
                  type="text"
                  v-model:modal-value="form.name"
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
                  type="text"
                  v-model:modal-value="form.nickName"
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
                  type="email"
                  v-model:modal-value="form.email"
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
              <div class="flex justify-end">
                <button
                  :disabled="
                    form.name === '' &&
                    form.email === '' &&
                    form.nickName === '' &&
                    form.profileImage === ''
                  "
                  type="submit"
                  class="px-5 py-2 disabled:contrast-50 bg-blue-500 text-white rounded-full"
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
                  Edit
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
