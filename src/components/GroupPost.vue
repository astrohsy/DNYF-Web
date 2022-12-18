<template>
  <q-card class="my-card">
    <q-card-section horizontal>
      <q-img src="images/group-preview-picture-1.jpg" style="width: 200px" />
      <q-card-section style="width: 100%">
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ group_name }}</div>
          </div>

          <q-rating
            v-model="starRating"
            :max="group_capacity"
            icon="persons"
            size="24px"
          />
        </q-card-section>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <div v-if="joinedGroup()">
          <q-btn flat color="red" @click="leaveGroup">Leave</q-btn>
        </div>
        <div v-else>
          <q-btn flat color="primary" @click="joinGroup">Join</q-btn>
        </div>
        <q-btn
          flat
          color="gray"
          :to="{
            name: 'group-detail',
            params: { id: group_id },
            props: { links },
          }"
        >
          Show more
        </q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  margin-top: 15px
</style>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "stores/user";
import { useGroupStore } from "stores/group";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  name: "GroupPost",
  props: {
    group_id: {
      type: Number,
      required: true,
    },
    group_name: {
      type: String,
      required: true,
    },
    group_capacity: {
      type: Number,
      required: true,
    },
    members: {
      type: Object,
      required: true,
    },
    links: {
      type: Object,
      required: false,
    },
  },
  methods: {
    joinedGroup() {
      const id = this.userStore.uid;
      return this.members?.map((x) => x.id).includes(id);
    },
    async joinGroup() {
      const tokenInfo = await this.$auth0.getAccessTokenSilently({
        detailedResponse: true,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${tokenInfo.id_token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      return this.groupStore.joinGroup(
        config,
        this.group_id,
        this.userStore.user.email
      );
    },
    async leaveGroup() {
      const tokenInfo = await this.$auth0.getAccessTokenSilently({
        detailedResponse: true,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${tokenInfo.id_token}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      return this.groupStore.leaveGroup(
        config,
        this.group_id,
        this.userStore.user.email
      );
    },
  },
  setup: () => {
    const userStore = useUserStore();
    const groupStore = useGroupStore();
    const { user } = useAuth0();
    return {
      userStore,
      groupStore,
      user,
      starRating: ref(1),
    };
  },
});
</script>
