import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: [],
    group: null,
  }),
  getters: {},
  actions: {
    async createGroup(config, data) {
      try {
        const response = await api.post("/groups", data, (config = config));
        const groups = response.data.data;
        console.log(`/groups: ${JSON.stringify(groups)}`);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchGroups(config) {
      try {
        const response = await api.get("/groups", (config = config));
        const groups = response.data.data;

        console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchGroup(config, id) {
      try {
        const response = await api.get(`/groups/${id}`, (config = config));
        const group = response.data.data;

        console.log(`/groups/{id}: ${JSON.stringify(group)}`);
        console.log(group);
        this.group = group;
      } catch (e) {
        console.log(e);
      }
    },
    async joinGroup(config, groupId, email) {
      try {
        const data = { user_email: email };
        await api.post(`/groups/${groupId}/members`, data, (config = config));

        const response = await api.get("/groups", (config = config));
        const groups = response.data.data;

        console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
    async leaveGroup(config, groupId, email) {
      try {
        const data = { user_email: email };
        await api.delete(
          `/groups/${groupId}/members/${email}`,
          (config = config)
        );

        const response = await api.get("/groups", (config = config));
        const groups = response.data.data;

        console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
