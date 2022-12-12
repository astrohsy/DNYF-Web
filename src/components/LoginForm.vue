<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md" @submit="handleSignIn">
      <q-btn type="submit">
        <q-avatar size="22px">
          <img src="images/auth0.png" />
        </q-avatar>
        <div :style="{ marginLeft: '5pt' }"></div>
        Login In with Auth0
      </q-btn>
      <pre>
      <code>{{ this.$auth0.user }}</code>
      <q-btn @click="group">fefe</q-btn>
    </pre>

      <div></div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useGroupStore } from "src/stores/group";
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";

export default defineComponent({
  name: "LoginForm",
  methods: {
    async handleSignIn() {
      await this.$auth0.loginWithRedirect();
    },
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
    const $q = useQuasar();
    const authStore = useAuthStore();
    const groupStore = useGroupStore();
    return {
      authStore,
      groupStore,
    };
  },
});
</script>
