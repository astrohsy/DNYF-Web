<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="handleSignUp" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="id"
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

      <q-input
        filled
        type="password"
        v-model="password_confirm"
        label="Your Confrim Password *"
        hint="Confirm Password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="tel"
        v-model="tel"
        label="Your Phone Number"
        hint="Mobile"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="email"
        v-model="email"
        label="Your Email"
        hint="Email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Sign Up" type="submit" class="q-ml-sm" />
        <q-btn
          to="/login"
          label="Cancel"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm float-right"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useAuthStore } from "src/stores/auth";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
const authStore = useAuthStore();
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
    return {
      authStore,
      $q,
      id: ref(null),
      password: ref(null),
      password_confirm: ref(null),
      tel: ref(null),
      email: ref(null),
    };
  },
});
</script>
