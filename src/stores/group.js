import { defineStore } from "pinia";
import { api } from "src/boot/axios";

const perPage = 4;

export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: [],
    group: null,
    pageNum: 0,
    currentPage: 1,
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
    async initGroups(config) {
      try {
        const response = await api.get(`/groups`, (config = config));
        const groups = response.data.data;
        this.currentPage = 0;
        this.pageNum = Math.ceil(groups.length / 4);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchGroups(config, limit = 100, offset = 0) {
      try {
        const response = await api.get(
          `/groups?limit=${limit}&offset=${(offset - 1) * perPage}`,
          (config = config)
        );
        const groups = response.data.data;

        //console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
        this.total = this.groups.length;
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

        const response = await api.get(
          `/groups?limit=${perPage}&offset=${
            (this.$state.currentPage - 1) * perPage
          }`,
          (config = config)
        );
        const groups = response.data.data;
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

        const response = await api.get(
          `/groups?limit=${perPage}&offset=${
            (this.$state.currentPage - 1) * perPage
          }`,
          (config = config)
        );
        const groups = response.data.data;

        console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
