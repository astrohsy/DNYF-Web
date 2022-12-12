import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
  }),
  getters: {
    isLogined: (state) => () => {
      return localStorage.username ? true : false;
    },
    getUsername: () => {
      return localStorage.username;
    },
  },
  actions: {
    async requestSignup(id, password) {
      console.log("Signup!!!", id, password);
    },
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
