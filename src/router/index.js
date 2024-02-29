import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: { requiresAuth: false },
    },
    {
      path: "/posts/:postId",
      name: "postDetail",
      component: () => import("../views/PostView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profilePage",
      component: () => import("../views/ProfileView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/followers",
      name: "followerPage",
      component: () => import("../views/FollowerView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/user/:userId",
      name: "userView",
      component: () => import("../views/UserView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:hashName/:hashtagId",
      name: "hashtagView",
      component: () => import("../views/HashView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/hashtags",
      name: "hashtagLists",
      component: () => import("../views/HashLists.vue"),
      meta: { requiresAuth: true },
    },
    {
      path : "/post/form",
      name : "postForm",
      component : () => import("../views/MobileForm.vue"),
      meta : {requiresAuth:true},
    },
    {
      path : "/search",
      name : "searchView",
      component : () => import("../views/SearchView.vue"),
      meta : {requiresAuth:true},
    },
    {
      path : "/account",
      name : "accountSetting",
      component : () => import("../views/AccountSetting.vue"),
      meta : {requiresAuth:true},
    }
  ],
});
router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    return { name: "login" };
  }
});
export default router;
