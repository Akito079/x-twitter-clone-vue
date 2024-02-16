<script setup>
import Logo from "@/components/Logo.vue";
import GoogleVue from "@/components/Authentication/Google.vue";
import Github from "@/components/Authentication/Github.vue";
import CreateAccount from "@/components/Authentication/CreateAccount.vue";
import SigninAccount from "@/components/Authentication/SigninAccount.vue";
</script>
<template>
  <div class="flex flex-col  lg:flex-row items-center justify-center gap-5 lg:gap-32 w-full h-screen my-20 sm:my-0 dark:bg-black">
    <div class=" max-w-[300px] w-full">
      <Logo size="w-20 h-20 lg:w-[350px] lg:h-[350px]"></Logo>
    </div>
    <!-- Login forms -->
    <div class="flex flex-col gap-4 max-w-[300px]  lg:max-w-[500px]">
      <h3 class="lg:text-[60px] text-[40px] font-bold font-open-san dark:text-white ">Happening now</h3>
      <p class="text-[30px] font-bold font-teko dark:text-gray-300">Join today.</p>
      <div>
        <GoogleVue></GoogleVue>
        <Github></Github>
        <div class="px-20 my-2">
          <span>Or</span>
        </div>
       <CreateAccount></CreateAccount>
      </div>
   
      <div class="text-[10px] space-x-1 my-2 dark:text-gray-300">
        <span>By sigining up,you agree to the</span>
        <span class="text-blue-500">Terms of Service</span>
        <span>and</span>
        <span class="text-blue-500">Privacy Policy</span>
        <span>,including</span>
        <span class="text-blue-500">Cookie Use.</span>
      </div>
      <div class="flex flex-col gap-5">
        <span class="dark:text-gray-300">Already have an account?</span>
        <SigninAccount></SigninAccount>
      </div>
    </div>
  </div>
</template>
