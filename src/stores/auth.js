import { defineStore } from "pinia";
import { useAuth0 } from "@auth0/auth0-vue";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    username: null,
  }),
  getters: {
    isLogined: (state) => () => {
      //console.log(this);

      console.log(localStorage.username);
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
