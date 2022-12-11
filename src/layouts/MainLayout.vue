<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-brand">
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title> DNYF </q-toolbar-title>
        <q-btn-toggle
          v-model="model"
          flat
          stretch
          toggle-color="secondary"
          :options="options"
        />
        <q-space> </q-space>
        Hi {{ authStore.username }}!
        <q-btn to="/" @click="handleSignOut">Logout</q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "stores/auth";
import { route } from "quasar/wrappers";
const authStore = useAuthStore();

export default defineComponent({
  name: "MainLayout",

  components: {
    //EssentialLink,
  },
  methods: {},
  setup() {
    const redirect = (e, go) => {
      console.log("hhihihihi");
      go({
        to: "/user", // we pick another route
        // replace: boolean; default is what the tab is configured with
        // returnRouterError: boolean
      })
        .then((_vueRouterResult) => {
          /* ... */
        })
        .catch((_vueRouterError) => {
          /* ...will not reach here unless returnRouterError === true */
        });
    };

    function handleSignOut(e, go) {
      e.preventDefault();
      authStore.requestLogout();
      setTimeout(() => {
        console.log("navigating as promised 2s ago");
        go({ to: "/login" });
      }, 100);
    }

    return {
      redirect,
      model: ref("one"),
      authStore,
      handleSignOut,

      options: [
        { label: "Home", value: "home" },
        { label: "Profile", value: "profile" },
      ],
    };
  },
});
</script>
