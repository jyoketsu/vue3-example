<template>
  <div class="welcome">
    <i class="logo"></i>
    <el-button @click="handleLogin" type="primary" size="large">{{
      $t("home.login")
    }}</el-button>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import { getDeviceType } from "../../utils/util";

const store = useStore();
const router = useRouter();
const user = computed(() => store.state.auth.user);
const dark = computed(() => store.state.common.dark);
const devicetype = computed(() => getDeviceType());

const handleLogin = () => {
  if (user.value) {
    router.push("/notes");
  } else {
    const redirect = encodeURIComponent(
      `${window.location.protocol}//${window.location.host}/#/login`
    );
    const logo = "https://notes.qingtime.cn/icons/logo2.svg";
    const APP = import.meta.env.VITE_APP;
    const APP_HIGH = import.meta.env.VITE_APP_HIGH;
    const url = `https://account.qingtime.cn?app=${APP}&apphigh=${APP_HIGH}&logo=${logo}&redirect=${redirect}`;
    window.location.href = url;
  }
};

const handle = (e: any) => {
  if (
    e.origin === "https://account.qingtime.cn" &&
    e.data.eventName === "redirect"
  ) {
    console.log("e.data.eventName", e.data.data);
    // router.push(e.data.data);
    window.location.href = e.data.data;
  }
};

onMounted(() => {
  window.addEventListener("message", handle);
  const token = localStorage.getItem("auth_token");
  if (token) {
    store.dispatch("auth/getUserByToken", token);
  }
});
onUnmounted(() => {
  window.removeEventListener("message", handle);
});
</script>
<style scoped>
.welcome {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--el-background-color-base);
}
.logo {
  width: 80vw;
  height: 80vh;
  background-image: url(/images/10020.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.download-buttons {
  position: absolute;
  top: 25px;
  right: 35px;
}
.download {
  color: var(--el-text-color-primary);
  text-decoration: none;
}
</style>
