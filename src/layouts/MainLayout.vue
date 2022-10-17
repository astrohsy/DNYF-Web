<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> DNYF App </q-toolbar-title>
        <q-btn-group rounded>
          <q-btn
            to="/user"
            label="Profile"
            rounded
            color="primary"
            icon="verified_user"
            no-caps
          />
          <q-btn
            to="/"
            label="Group"
            rounded
            color="primary"
            icon="groups"
            no-caps
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
//import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    //EssentialLink,
  },

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

    return {
      redirect,
    };
  },
});
</script>
