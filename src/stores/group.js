import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: [],
  }),
  getters: {},
  actions: {
    async fetchGroups() {
      try {
        const response = await api.get("/groups");
        const groups = response.data.data;

        console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
    async goToGroupEdit() {
      this.router.push("/group-edit");
    },
  },
});
