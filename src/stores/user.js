import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    created: false,
  }),
  getters: {},
  actions: {
    async createUser(config, data) {
      console.log(data);
      try {
        const response = await api.post("/users", data, (config = config));
        const users = response.data;
        console.log(`/users: ${JSON.stringify(users)}`);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchUser(config, id) {
      try {
        const response = await api.get(`/users/${id}`, (config = config));
        const user = response.data;

        console.log(`/users/{id}: ${JSON.stringify(user)}`);
        console.log(user);
        this.user = user;
        this.created = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
