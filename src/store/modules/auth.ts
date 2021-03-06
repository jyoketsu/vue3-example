import { MutationTree, ActionTree } from "vuex";
import { RootState } from "../types/RootState";
import { AuthState } from "../types/AuthState";
import api from "../../utils/api";
import { ElMessage } from "element-plus";
import i18n from "../../locales";

const state: AuthState = {
  user: null,
  expired: false,
  uploadToken: null,
};

const mutations: MutationTree<AuthState> = {
  // 保存用户信息
  setUser(state, data) {
    state.user = data;
    state.expired = false;
  },
  // 清除用户信息
  clearUser(state) {
    state.user = null;
    state.expired = true;
    localStorage.clear();
  },
  setUploadToken(state, data) {
    state.uploadToken = data;
  },
};

const actions: ActionTree<AuthState, RootState> = {
  // 获取用户信息
  async getUserByToken({ commit }, token: string) {
    const res: any = await api.auth.loginByToken(token);
    if (res.statusCode === "200") {
      api.setToken(token);
      const user = res.result;
      commit("setUser", user);
    } else {
      commit("clearUser");
    }
  },
  logout({ commit }) {
    commit("clearUser");
  },
  async getUploadToken({ commit }) {
    const res: any = await api.auth.getUptoken();
    if (res.statusCode === "200") {
      commit("setUploadToken", res.result);
    } else {
      ElMessage.error(i18n.global.t("message.qiniuFailed"));
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
