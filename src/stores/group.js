import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: [],
    group: null,
  }),
  getters: {},
  actions: {
    async createGroup(data) {
      try {
        console.log(data);
        const response = await api.post("/groups/", data);
        const groups = response.data.data;
        console.log(`/groups: ${JSON.stringify(groups)}`);
      } catch (e) {
        console.log(e);
      }
    },
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
    async fetchGroup(id) {
      try {
        const response = await api.get(`/groups/${id}`);
        const group = response.data.data;

        console.log(`/groups/{id}: ${JSON.stringify(group)}`);
        const members = await this.fetchLinkedData(group.links, "get_members");
        console.log(members);

        const membersWithUserInfo = await Promise.all(
          members.map((x) => {
            return new Promise(async (resolve) =>
              this.fetchLinkedData(x.links, "get_user_info")
            );
          })
        );
        group["members"] = membersWithUserInfo;
        console.log(membersWithUserInfo);
        this.group = group;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchLinkedData(links, rel, resolve) {
      try {
        const link = links.filter((x) => x.rel === rel)[0];
        const response = await api.get(link.href);
        return response.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async goToGroupEdit() {
      this.router.push("/group-edit");
    },
  },
});
