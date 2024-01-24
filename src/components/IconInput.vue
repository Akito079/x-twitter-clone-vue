<script setup>
const props = defineProps(["labelIcon","type"]);
const emits = defineEmits(["imageFiles"]);
</script>
<template>
  <div class="">
    <label for="imageInput"  v-html="props.labelIcon" ></label>
    <input :type="props.type" name="" class="hidden" id="imageInput" />
  </div>
</template>