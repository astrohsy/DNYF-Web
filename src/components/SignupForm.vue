<template>
  <div class="q-pa-xs" style="max-width: 500px">
    <q-form @submit="handleSignUp" class="q-gutter-md">
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
        v-model="user.nickname"
        label="Nickname"
        lazy-rules
        disable
        readonly
      />

      <div class="row items-start">
        <q-input
          filled
          type="str"
          v-model="userStore.user.first_name"
          label="Your First Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        <q-space />
        <q-input
          filled
          type="str"
          v-model="userStore.user.last_name"
          label="Your Last Name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>

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
        type="zip"
        v-model="userStore.user.zip_code"
        label="Your Zipcode"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Confrim" type="submit" class="q-ml-sm" />
        <q-btn
          to="/"
          label="Cancel"
          color="primary"
          flat
          class="q-ml-sm float-right"
        />
      </div>
    </q-form>
    <q-inner-loading :showing="userStore.inProgress">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import { useUserStore } from "src/stores/user";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuth0 } from "@auth0/auth0-vue";

export default defineComponent({
  name: "SignupForm",
  methods: {
    async handleSignUp() {
      const $q = useQuasar();
      const tokenInfo = await this.$auth0.getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${tokenInfo}`,
          "Access-Control-Allow-Origin": "*",
        },
      };
      const data = {
        first_name: this.userStore.user.first_name,
        last_name: this.userStore.user.last_name,
        phone: this.userStore.user.phone,
        email: this.user.email,
        zip_code: this.userStore.user.zip_code,
      };
      await this.userStore.createUser(config, data);
      this.$router.push("/");

      $q.notify({
        message: "Profile Saved!!!",
        caption: "Welcome to DNYF!!",
        color: "primary",
        position: "bottom",
      });
    },
  },
  setup() {
    const { user } = useAuth0();
    const userStore = useUserStore();
    return {
      userStore,
      user,
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
    this.userStore.fetchUser(config, this.user.email);
  },
});
</script>
