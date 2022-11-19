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
          toggle-color="yellow"
          :options="options"
        />
        <q-space> </q-space>
        fef
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
      model: ref("one"),

      options: [
        { label: "Home", value: "home" },
        { label: "Profile", value: "profile" },
      ],
    };
  },
});
</script>
