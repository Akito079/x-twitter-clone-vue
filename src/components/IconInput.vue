<script setup>
const props = defineProps(["labelIcon", "type"]);
const emits = defineEmits(["imageFiles"]);
</script>
<template>
  <div class="">
    <label for="imageInput" v-html="props.labelIcon"></label>
    <input
      :type="props.type"
      @change="emits('imageFiles', $event.target.files)"
      multiple
      accept="images/*"
      name=""
      class="hidden"
      id="imageInput"
    />
  </div>
</template>
