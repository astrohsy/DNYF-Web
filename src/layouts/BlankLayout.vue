<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-inner-loading :showing="true">
        <q-spinner-gears size="150px" color="primary" />
      </q-inner-loading>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { useUserStore } from "src/stores/user";

export default {
  name: "BlankLayout",

  setup() {
    const userStore = useUserStore();
    const { user } = useAuth0();

    return {
      user,
      userStore,
    };
  },
  async mounted() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    if (!this.userStore.uid) {
      this.userStore.fetchUser(config, this.user.email);
    }
    setTimeout(() => {
      if (!this.userStore.uid) {
        this.$router.push({ path: "/profile" });
      } else {
        this.$router.push({ path: "/" });
      }
    }, 1000);
  },
};
</script>
