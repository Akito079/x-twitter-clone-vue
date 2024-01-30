<script setup>
import { onMounted } from 'vue';
const props = defineProps(["labelIcon","type","inputId"]);
const emits = defineEmits(["imageFiles",]);
</script>
<template>
  <div class="">
    <label :for="props.inputId" v-html="props.labelIcon"></label>
    <input
      :type="props.type"
      @change="emits('imageFiles',$event.target.files)"
      multiple
      accept="images/*"
      name=""
      class="hidden"
      :id="props.inputId"
    />
  </div>
</template>
