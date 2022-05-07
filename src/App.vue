<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { computed, onMounted, watchEffect } from "vue";
import { useStore } from "./store";
import setDark from "./utils/dark";
import setTheme from "./utils/theme";
import "element-plus/es/components/message/style/css";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const isDark = computed(() => store.state.common.dark);
const theme = computed(() => store.state.common.theme);
const expired = computed(() => store.state.auth.expired);

onMounted(() => {
  setDark(isDark.value);
  setTheme(theme.value);
});

watchEffect(() => {
  if (expired.value) {
    router.push("/welcome");
    // window.location.reload();
  }
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
html,
body,
#app {
  position: relative;
  width: 100%;
  min-height: 100vh;
  margin: unset;
}
#app {
  font-family: "zh quote", -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Noto Sans", "Noto Sans CJK SC", "Microsoft YaHei UI", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--el-background-color-base);
  color: var(--el-text-color-primary);
  box-sizing: border-box;
}

.el-popup-parent--hidden {
  overflow: hidden;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
  background: "#474747";
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  background-color: var(--el-color-primary);
}
:focus {
  outline: none;
}
.el-dialog {
  max-width: 540px;
}
</style>
