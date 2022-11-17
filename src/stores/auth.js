import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLogined: false,
    username: null,
  }),
  getters: {},
  actions: {
    async requestLogin() {
      this.isLogined = true;
      this.username = "bob";
      console.log(this);
    },
    async requestLogout() {
      this.isLogined = false;
      this.username = null;
    },
  },
});
