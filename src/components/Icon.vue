<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  name: String,
});
</script>
<style>
.icon {
  width: 1.5em;
  height: 1.5em;
  margin: 5px;
  fill: var(--el-text-color-primary);
  overflow: hidden;
  cursor: pointer;
}
</style>
