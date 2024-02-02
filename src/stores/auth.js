import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const authUser = ref(null);
  const token  = ref(localStorage.getItem('token'));

  async function signIn(payload){
    const response = await axios.post('http://localhost:8000/api/login',payload);
    token.value = response.data.token;
    localStorage.setItem('token',token.value);
  }
  async function signUp(payload){
    await axios.post('http://localhost:8000/api/register',payload);
  }
  async function signOut(){
    const header = {
      Authorization : `Bearer ${token.value}`,
    }
    await axios.post('http://localhost:8000/api/logout',"",{headers:header});
  }

  async function getAuthUser(){
    const header = {
      Authorization : `Bearer ${token.value}`,
    }
    const response = await axios.get('http://localhost:8000/api/user',{headers:header});
    authUser.value = response.data.data;
    return authUser.value
  }
  return {authUser,signIn,signOut,signUp,getAuthUser}
});
