import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    uid: null,
    created: false,
  }),
  getters: {},
  actions: {
    async createUser(config, data) {
      console.log(data);
      try {
        if (this.$state.uid) {
          const response = await api.put(
            `/users/${this.$state.uid}`,
            data,
            (config = config)
          );
        } else {
          const response = await api.post("/users", data, (config = config));
        }
      } catch (e) {
        console.log(e);
      }
    },
    async fetchUser(config, email) {
      try {
        const getIdResponse = await api.get(
          `/users/${email}/id`,
          (config = config)
        );
        const uid = getIdResponse.data.uid;

        // fetch ID
        const response = await api.get(`/users/${uid}`, (config = config));
        const user = response.data;

        console.log(`/users/{id}: ${JSON.stringify(user)}`);
        console.log(user);
        this.uid = uid;
        this.user = user;
        this.created = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
