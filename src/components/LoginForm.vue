<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <q-btn type="submit">
        <q-avatar size="22px">
          <img src="images/auth0.png" />
        </q-avatar>
        <div :style="{ marginLeft: '5pt' }"></div>
        Login In with Auth0
      </q-btn>
      <pre>
      <code>{{ this.$auth0.user }}</code>
      <q-btn @click="group">test</q-btn>
    </pre>

      <div></div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useGroupStore } from "src/stores/group";

export default defineComponent({
  name: "LoginForm",
  methods: {
    async group() {
      const tokenInfo = await this.$auth0.getAccessTokenSilently({
        detailedResponse: true,
      });
      const config = {
        headers: { Authorization: `Bearer ${tokenInfo.id_token}` },
      };
      this.groupStore.fetchGroups(config);
    },
  },
  setup() {
    const groupStore = useGroupStore();
    return {
      groupStore,
    };
  },
});
</script>
