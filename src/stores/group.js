import { defineStore } from "pinia";
import { api } from "src/boot/axios";

const perPage = 4;

export const useGroupStore = defineStore("group", {
  state: () => ({
    search: null,
    groups: [],
    group: null,
    pageNum: 0,
    currentPage: 0,
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
        //this.currentPage = 0;
        var req = `/groups`;
        if (this.$state.search) {
          req += `?group_name=${this.$state.search}`;
        }
        const response = await api.get(req, (config = config));
        const groups = response.data.data;
        console.log(groups);
        this.pageNum = Math.ceil(groups.length / 4);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchGroups(config) {
      try {
        const offset = this.$state.currentPage;
        var req = `/groups?limit=${perPage}&offset=${offset * perPage}`;
        if (this.$state.search) {
          req += `&group_name=${this.$state.search}`;
        }
        const response = await api.get(req, (config = config));
        const groups = response.data.data;
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

        const offset = this.$state.currentPage;
        var req = `/groups?limit=${perPage}&offset=${offset * perPage}`;
        if (this.$state.search) {
          req += `&group_name=${this.$state.search}`;
        }
        const response = await api.get(req, (config = config));
        const groups = response.data.data;
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
    async leaveGroup(config, groupId, email) {
      try {
        await api.delete(
          `/groups/${groupId}/members/${email}`,
          (config = config)
        );
        const offset = this.$state.currentPage;
        var req = `/groups?limit=${perPage}&offset=${offset * perPage}`;
        if (this.$state.search) {
          req += `&group_name=${this.$state.search}`;
        }
        const response = await api.get(req, (config = config));

        const groups = response.data.data;

        console.log(`/groups: ${JSON.stringify(groups)}`);
        this.groups = groups;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
