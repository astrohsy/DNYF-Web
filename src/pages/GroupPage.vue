<template>
  <q-page padding>
    <div>
      <q-splitter v-model="splitterModel" unit="px" style="height: 90%">
        <template v-slot:before>
          <div class="q-pa-sm">
            <div class="q-pa-md">
              <div class="text-h5 q-mb-md">Search</div>
            </div>
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

            <q-btn
              @click="groupStore.goToGroupEdit()"
              label="Create Group"
              rounded
              color="primary"
              icon="groups"
              no-caps
            />
          </div>
        </template>
        <template v-slot:after>
          <div class="q-pa-md">
            <GroupPost
              v-bind:key="item.group_id"
              v-for="item in groupStore.groups"
              v-bind="item"
            />
          </div>
        </template>
      </q-splitter>
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
