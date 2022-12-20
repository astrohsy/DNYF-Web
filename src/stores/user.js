import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    uid: null,
    inProgress: false,
    created: false,
  }),
  getters: {},
  actions: {
    async createUser(config, data) {
      try {
        this.$state.inProgress = true;
        if (this.$state.uid) {
          const response = await api.put(
            `/users/${this.$state.uid}`,
            data,
            (config = config)
          );
        } else {
          const response = await api.post("/users", data, (config = config));
          this.$state.inProgress = false;
        }
      } catch (e) {
        this.$state.inProgress = false;
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

        this.uid = uid;
        this.user = user;
        this.created = true;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
