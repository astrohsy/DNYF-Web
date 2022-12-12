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

        <q-btn>
          <q-avatar>
            <img :src="user.picture" />
          </q-avatar>
          {{ user.given_name }}
        </q-btn>
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
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    //EssentialLink,
  },
  methods: {},
  setup() {
    const { logout, user } = useAuth0();
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
      logout();
    }

    return {
      redirect,
      model: ref("one"),
      authStore,
      handleSignOut,
      user,
      options: [
        { label: "Home", value: "home" },
        { label: "Profile", value: "profile" },
      ],
    };
  },
});
</script>
