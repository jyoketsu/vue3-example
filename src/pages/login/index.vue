<template>
  <div class="login" v-loading="true"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";

const router = useRouter();
const route = useRoute();
const store = useStore();
const user = computed(() => store.state.auth.user);

watch(user, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    router.push("/");
  }
});

onMounted(() => {
  const query = route.query;
  const token = query.token;
  if (token) {
    store.dispatch("auth/getUserByToken", token);
  }
});
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
}
</style>
