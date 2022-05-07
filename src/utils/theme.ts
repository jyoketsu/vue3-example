import { ref } from "vue";
import { store } from "../store";
import { useCssVar } from "@vueuse/core";

const setTheme = (value: string) => {
  store.commit("common/setTheme", value);
  console.log("执行切换主题色事件：", value);
  const el = ref(null);
  const primary_color = useCssVar("--el-color-primary", el);
  primary_color.value = value;
};

export default setTheme;
