// 颜色管理
import { ref } from "vue";

export const lightColors = [
  { name: "--el-background-color-base", value: "#F7F7F7" },
  { name: "--el-bg-color-overlay", value: "#ffffff" },
  { name: "--el-color-white", value: "#ffffff" },
  { name: "--el-fill-color-light", value: "#f5f7fa" },
  { name: "--el-text-color-primary", value: "#303133" },
  { name: "--el-text-color-regular", value: "#606266" },
  { name: "--el-color-primary-light-7", value: "#c6e2ff" },
  { name: "--el-color-primary-light-9", value: "#ecf5ff" },
  { name: "--el-border-color", value: "#dcdfe6" },
  { name: "--el-border-color-base", value: "#dcdfe6" },
  { name: "--el-border-color-light", value: "#e4e7ed" },
  { name: "--el-border-color-extra-light", value: "#f2f6fc" },
  { name: "--el-border-color-lighter", value: "#ebeef5" },
  { name: "--el-bg-color", value: "#ffffff" },
  { name: "--el-button-bg-color", value: "#ffffff" },
  { name: "--el-fill-color-blank", value: "#ffffff" },

  { name: "--notes-color-gray", value: "#999999" },
  { name: "--notes-color-gray-2", value: "#e5e2e3" },
  { name: "--notes-color-gray-3", value: "#eeeced" },
  { name: "--notes-color-gray-4", value: "#f9f9f9" },
  { name: "--notes-color-border", value: "#e1e1e1" },
  { name: "--notes-color-menu", value: "#f7f7f7" },
  { name: "--notes-color-menu-hover", value: "#fff" },
  {
    name: "--notes-color-shadow",
    value: "0px 2px 12px 0px rgba(0, 0, 0, 0.5)",
  },
  { name: "--notes-color-hover-shadow", value: "unset" },
];

export const darkColors = [
  { name: "--el-background-color-base", value: "#373A48" },
  { name: "--el-bg-color-overlay", value: "#171923" },
  { name: "--el-color-white", value: "#171923" },
  { name: "--el-fill-color-light", value: "#2f313d" },
  { name: "--el-text-color-primary", value: "#ffffff" },
  { name: "--el-text-color-regular", value: "#d0d0d0" },
  { name: "--el-color-primary-light-7", value: "#121212" },
  { name: "--el-color-primary-light-9", value: "#1f1f1f" },
  { name: "--el-border-color", value: "#434343" },
  { name: "--el-border-color-base", value: "#434343" },
  { name: "--el-border-color-light", value: "#434343" },
  { name: "--el-border-color-extra-light", value: "#5c5c5c" },
  { name: "--el-border-color-lighter", value: "#434343" },
  { name: "--el-bg-color", value: "#171923" },
  { name: "--el-button-bg-color", value: "#171923" },
  { name: "--el-fill-color-blank", value: "#171923" },

  { name: "--notes-color-gray", value: "#999999" },
  { name: "--notes-color-gray-2", value: "#07080b" },
  { name: "--notes-color-gray-3", value: "#101118" },
  { name: "--notes-color-gray-4", value: "#0f1016" },
  { name: "--notes-color-border", value: "#171923" },
  { name: "--notes-color-menu", value: "#171923" },
  { name: "--notes-color-menu-hover", value: "#434655" },
  {
    name: "--notes-color-shadow",
    value: "0px 2px 12px 0px rgba(0, 0, 0, 0.5)",
  },
  {
    name: "--notes-color-hover-shadow",
    value: "0px 2px 12px 0px rgba(0, 0, 0, 0.5)",
  },
];

export const color = () => {
  // 主题颜色变量组
  const themeList = ref([
    { name: "拂晓蓝(默认)", value: "#409eff" },
    { name: "薄暮红", value: "#e74c3c" },
    { name: "火山橘", value: "#e67e22" },
    { name: "日暮黄", value: "#f1c40f" },
    { name: "极光绿", value: "#16a085" },
    { name: "酱紫", value: "#9b59b6" },
  ]);
  // 明亮模式全局颜色
  const lightList = ref(lightColors);
  // 暗黑模式全局颜色
  const darkList = ref(darkColors);
  return {
    lightList,
    darkList,
    themeList,
  };
};
