<template>
  <q-page padding>
    <div>
      <div class="row justify-start" :style="{ marginBottom: '2em' }">
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
      <div class="q-pa-sm">
        <q-input
          v-model="search"
          debounce="500"
          filled
          placeholder="Search by title"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="q-pa-md">
        <GroupPost
          v-bind:key="item.group_id"
          v-for="item in groupStore.groups"
          v-bind="item"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GroupPost from "src/components/GroupPost.vue";
import { useGroupStore } from "stores/group";
import { useQuasar } from "quasar";
const data = ref(null);

export default defineComponent({
  name: "GroupPage",

  components: {
    GroupPost,
  },

  setup() {
    const groupStore = useGroupStore();
    const $q = useQuasar();
    return {
      groupStore,
      splitterModel: ref(250),
      group: ref(["op1"]),
      search: ref(null),
    };
  },
  async mounted() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently({
      detailedResponse: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.id_token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    await this.groupStore.fetchGroups(config);
  },
  async created() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently({
      detailedResponse: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.id_token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    this.groupStore.fetchGroups(config);
  },
});
</script>
