import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
  }),
  getters: {
    isLogined: (state) => () => {
      console.log(111);
      console.log(localStorage.username);
      return localStorage.username ? true : false;
    },
    getUsername: () => {
      return localStorage.username;
    },
  },
  actions: {
    async requestLogin(id, password) {
      this.username = id;
      localStorage.setItem("username", this.username);
    },
    async requestLogout() {
      //this.username = null;
      localStorage.removeItem("username");
    },
  },
});
