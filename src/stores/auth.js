import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
  }),
  getters: {
    isLogined: () => {
      return localStorage.username ? true : false;
    },
  },
  actions: {
    async requestLogin() {
      localStorage.setItem("username", this.username);
      settimeout(500, () => {
        this.username = "bob";
      });
    },
    async requestLogout() {
      this.username = null;
      localStorage.removeItem("username");
    },
  },
});
