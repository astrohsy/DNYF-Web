import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  getters: {},
  actions: {
    async createUser(config, data) {
      try {
        const response = await api.post("/user", data, (config = config));
        const groups = response.data.data;
        console.log(`/groups: ${JSON.stringify(groups)}`);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchUser(config, id) {
      try {
        id = "sample1";
        const response = await api.get(`/users/${id}`, (config = config));
        const user = response.data;

        console.log(`/users/{id}: ${JSON.stringify(user)}`);
        console.log(user);
        this.user = user;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
