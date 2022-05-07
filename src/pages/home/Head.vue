<template>
  <div class="head">
    <div class="page-button" @click="changePage('songoku')">
      {{ $t("example.songoku") }}
    </div>
    <div class="page-button" @click="changePage('piccolo')">
      {{ $t("example.piccolo") }}
    </div>
    <div class="page-button" @click="changePage('vegeta')">
      {{ $t("example.vegeta") }}
    </div>
    <span class="space"></span>
    <el-select
      v-model="currentLocale"
      @change="(val:string) => changeLocale(val)"
      style="width: 100px"
    >
      <el-option label="简体中文" value="zh-CN" />
      <el-option label="繁體中文" value="zh-TW" />
      <el-option label="English" value="en" />
      <el-option label="日本語" value="ja" />
    </el-select>
    <Icon
      :name="isDark ? 'icon-a-brightness1x' : 'icon-a-DarkMode1x'"
      @click="toggleDark"
    />
    <Icon name="icon-a-Quit1x" @click="handleLogout" />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import Icon from "../../components/Icon.vue";
import setDark from "../../utils/dark";

const { locale } = useI18n();
const store = useStore();
const router = useRouter();
const currentLocale = computed(() => store.state.common.locale);
const isDark = computed(() => store.state.common.dark);

function changeLocale(type: string) {
  locale.value = type;
  store.dispatch("common/changeLocale", type);
}
function changePage(path: string) {
  router.push(path);
}
function toggleDark() {
  setDark(!isDark.value);
}
function handleLogout() {
  store.dispatch("auth/logout");
}
</script>
<style scoped>
.head {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
}
.space {
  flex: 1;
}
.page-button {
  margin: 0 5px;
  color: var(--el-text-color-primary);
  cursor: pointer;
}
</style>
