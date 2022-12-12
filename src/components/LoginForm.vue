<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md" @submit="login">
      <q-input
        filled
        v-model="username"
        label="Your ID *"
        hint="Username"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your Password *"
        hint="Password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <pre>
      <code>{{ user }}</code>
      <q-btn @click="group">fefe</q-btn>
    </pre>

      <div>
        <q-btn label="Sign In" type="submit" color="primary" />
        <q-btn to="/signup" label="Sign Up" type="reset" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useGroupStore } from "src/stores/group";
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  name: "LoginForm",
  methods: {
    handleSignIn() {
      this.authStore.requestLogin(this.username, this.password);
      console.log(this.$router.currentRoute);
      this.$router.push({ path: "/" });
      console.log(this.$router.currentRoute);
    },
  },
  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const groupStore = useGroupStore();
    const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } =
      useAuth0();

    var username = ref(null);
    var password = ref(null);

    return {
      authStore,
      username,
      password,
      login: () => {
        loginWithRedirect();
      },
      group: async () => {
        const a = await getAccessTokenSilently({ detailedResponse: true });
        const config = { headers: { Authorization: `Bearer ${a.id_token}` } };
        groupStore.fetchGroups(config);
      },
      user,
      isAuthenticated,
    };
  },
});
</script>
