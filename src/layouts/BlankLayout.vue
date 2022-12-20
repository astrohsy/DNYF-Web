<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      {{ this.userStore.uid }}
      <!-- This is where pages get injected -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { watch } from "fs";
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
    const tokenInfo = await this.$auth0.getAccessTokenSilently({
      detailedResponse: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
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
    }, 100);
  },
  watch,
};
</script>
