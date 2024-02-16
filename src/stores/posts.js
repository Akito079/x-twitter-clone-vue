import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore("posts", () => {
  const posts = ref(null);
  const token = ref("");
  //create posts
  async function storePosts(payload) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    token.value = localStorage.getItem("token");
    const header = {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "multipart/form-data",
    };
    await axios.post("http://localhost:8000/api/posts", payload, {
      headers: header,
    });
  }

  //post index
  async function postsIndex() {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    token.value = localStorage.getItem("token");
    const header = {
      Authorization: `Bearer ${token.value}`,
    };
    const response = await axios.get("http://localhost:8000/api/posts", {
      headers: header,
    });
    posts.value = response.data.data;
  }

  //getter posts
  const getPosts = computed(() => posts.value);

  //delete posts
  async function postDestroy(postId) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    token.value = localStorage.getItem("token");
    const header = {
      Authorization: `Bearer ${token.value}`,
    };
    await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
      headers: header,
    });
  }

  // get specific post
  async function getPostDetail(postId) {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    token.value = localStorage.getItem("token");
    const header = {
      Authorization: `Bearer ${token.value}`,
    };
    const response = await axios.get(`http://localhost:8000/api/posts/${postId}?includeComments=true`,{headers:header});
    posts.value = response.data.posts;
  }

  //update post
  async function postUpdate(postId,payload){
    await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    token.value = localStorage.getItem('token');
    const header = {
      Authorization : `Bearer ${token.value}`,
      "Content-Type": "multipart/form-data",
    } 
    await axios.post(`http://localhost:8000/api/posts/${postId}?_method=PUT`,payload,{headers:header})
  }

  //empty posts
  function emptyPosts() {
    posts.value = null;
    token.value = "";
  }

  return {
    storePosts,
    postsIndex,
    postDestroy,
    getPosts,
    getPostDetail,
    postUpdate,
    emptyPosts,
  };
});
