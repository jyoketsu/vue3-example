import { ref } from "vue";
import { store } from "../store";
import { color } from "./color";
import { useCssVar } from "@vueuse/core";

// 切换暗黑模式
const setDark = (value: boolean) => {
  let { darkList, lightList } = color();
  store.commit("common/setDark", value);
  console.log("执行切换开启暗黑模式事件：", value);
  const el = ref(null);
  if (value) {
    console.log("要切换为暗黑模式");
    darkList.value.forEach((item, index) => {
      const color_item = useCssVar(item.name, el);
      color_item.value = item.value;
    });
  } else {
    console.log("要切换为明亮模式");
    lightList.value.forEach((item, index) => {
      const color_item = useCssVar(item.name, el);
      color_item.value = item.value;
    });
  }
};

export default setDark;
