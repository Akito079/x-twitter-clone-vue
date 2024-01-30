<script setup>
import Logo from "@/components/Logo.vue";
import GoogleVue from "@/components/Authentication/Google.vue";
import Github from "@/components/Authentication/Github.vue";
</script>
<template>
  <div class="flex items-center justify-center gap-32 w-full h-screen">
    <Logo size="w-[350px] h-[350px]"></Logo>
    <!-- Login forms -->
    <div class="flex flex-col gap-4">
      <h3 class="text-[60px] font-bold font-open-san">Happening now</h3>
      <p class="text-[30px] font-bold font-roboto">Join today.</p>
      <div>
        <GoogleVue></GoogleVue>
        <Github></Github>
      </div>
      <div class="max-w-[200px] text-center">
        <span>Or</span>
      </div>
      <div class="flex flex-col w-[200px]">
        <button
          class="px-10 py-2 bg-blue-500 rounded-full font-bold text-white"
        >
          Create account
        </button>
        <div class="text-[10px] space-x-1  my-2">
          <span>By sigining up,you agree to the</span>
          <span class="text-blue-500">Terms of Service</span>
          <span>and</span>
          <span class="text-blue-500"> Privacy Policy</span>
          <span>, including</span>
          <span class="text-blue-500"> Cookie Use.</span>
        </div>
      </div>
    </div>
  </div>
</template>
