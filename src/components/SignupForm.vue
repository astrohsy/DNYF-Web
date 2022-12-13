<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="handleSignUp" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="user.email"
        label="ID"
        lazy-rules
        disable
        readonly
      />
      <q-input
        filled
        v-model="user.given_name"
        label="Name"
        lazy-rules
        disable
        readonly
      />
      <q-input
        filled
        v-model="user.nickname"
        label="Nickname"
        lazy-rules
        disable
        readonly
      />

      <q-input
        filled
        type="tel"
        v-model="userStore.user.phone"
        label="Your Phone Number"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="email"
        v-model="userStore.user.email"
        label="Your Email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="zip"
        v-model="userStore.user.zip_code"
        label="Your Zipcode"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Sign Up" type="submit" class="q-ml-sm" />
        <q-btn
          to="/"
          label="Cancel"
          color="primary"
          flat
          class="q-ml-sm float-right"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useUserStore } from "src/stores/user";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuth0 } from "@auth0/auth0-vue";
const $q = useQuasar();

export default defineComponent({
  name: "SignupForm",
  methods: {
    async handleSignUp() {
      this.authStore.requestSignup(this.username, this.password);

      this.$q.notify({
        message: "Sign Up Completed!!!",
        caption: "Welcome to DNYF!!",
        color: "primary",
        position: "top",
      });
      //this.$router.push({ path: "/" });
      console.log(this.$router.currentRoute);
    },
  },
  setup() {
    const { user } = useAuth0();
    const userStore = useUserStore();
    console.log(user);
    return {
      userStore,
      $q,
      fullname: () => user.given_name + " " + user.family_name,
      tel: ref(null),
      email: ref(null),
      user,
    };
  },
  async mounted() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently({
      detailedResponse: true,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo.id_token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    this.userStore.fetchUser(config, this.$auth0.email);
  },
});
</script>
