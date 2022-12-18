<template>
  <q-page padding>
    <div class="row justify-start" :style="{ marginBottom: '1em' }">
      <q-input
        v-model="search"
        class="col-7"
        debounce="500"
        filled
        placeholder="Search by title"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-space />
      <q-btn
        @click="
          () => {
            this.$router.push('/group-edit');
          }
        "
        label="Create Group"
        class="col-2"
        rounded
        color="primary"
        icon="groups"
        no-caps
      />
      <q-btn
        @click="
          () => {
            this.$router.push('/profile');
          }
        "
        label="Edit Profile"
        :style="{ marginLeft: '1em' }"
        class="col-2"
        rounded
        color="red"
        icon="manage_accounts"
        no-caps
      />
    </div>
    <div class="q-pa-md">
      <GroupPost
        v-bind:key="item.group_id"
        v-for="item in groupStore.groups"
        v-bind="item"
        :hello="groupStore.currentPage"
      />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="groupStore.currentPage"
        :max="groupStore.pageNum"
        @click="fetchNextPage"
        input
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GroupPost from "src/components/GroupPost.vue";
import { useGroupStore } from "stores/group";
import { useUserStore } from "stores/user";
import { useQuasar } from "quasar";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  name: "GroupPage",
  methods: {
    async fetchNextPage() {
      const tokenInfo = await this.$auth0.getAccessTokenSilently({
        detailedResponse: true,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      this.groupStore.fetchGroups(config, 4, this.groupStore.currentPage);
    },
  },
  components: {
    GroupPost,
  },

  setup() {
    const groupStore = useGroupStore();
    const userStore = useUserStore();
    const { user } = useAuth0();
    const $q = useQuasar();
    return {
      groupStore,
      userStore,
      user,
      current: ref(0),
      search: ref(null),
    };
  },
  async mounted() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently({
      detailedResponse: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    this.groupStore.fetchGroups(config, 4, 1);
  },
  async created() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently({
      detailedResponse: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    await this.groupStore.initGroups(config);
    this.groupStore.fetchGroups(config, 4, 1);

    if (!this.userStore.uid) {
      this.userStore.fetchUser(config, this.user.email);
    }
  },
});
</script>
