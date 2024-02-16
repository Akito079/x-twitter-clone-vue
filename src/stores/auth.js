import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref('');

  async function signIn(payload) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    const response = await axios.post(
      "http://localhost:8000/api/login",
      payload
    );
    token.value = response.data.token;
    localStorage.setItem("token", token.value);
  }
  async function signUp(payload) {
    const header = {
      "Content-Type": "multipart/form-data",
    }
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    await axios.post("http://localhost:8000/api/register", payload,{headers:header});
  }
  async function signOut() {
    token.value = localStorage.getItem('token');
    const header = {
      Authorization: `Bearer ${token.value}`,
    };
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    await axios.post("http://localhost:8000/api/logout", "", {
      headers: header,
    });
    token.value = "";
    user.value = "";
  }

  async function authUser() {
    token.value = localStorage.getItem('token');
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    const header = {
      Authorization: `Bearer ${token.value}`,
    };
    const response = await axios.get("http://localhost:8000/api/user", {
      headers: header,
    });
    user.value = response.data.data;
  }

  const getAuthUser = computed(() => user.value);
  return { user, authUser, signIn, signOut, signUp, getAuthUser };
});
