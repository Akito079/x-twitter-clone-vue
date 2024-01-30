<script setup>
const policies = [
  "Terms of service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "ads info",
  "More ...",
];
</script>
<template>
  <ul class="flex space-x-2 flex-wrap mb-20 px-3">
    <li v-for="policy in policies">
      <a class="text-sm link hover:underline cursor-pointer text-gray-500">{{ policy }}</a>
    </li>
    <li>
      <a class="text-sm link  text-gray-500">@2024 X Corp</a>
    </li>
  </ul>
</template>
