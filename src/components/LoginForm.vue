<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md" @submit="handleSignIn">
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
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
const authStore = useAuthStore();

export default defineComponent({
  name: "LoginForm",
  methods: {
    handleSignIn() {
      authStore.requestLogin();
      this.$router.push("/");
    },
  },
  setup() {
    const $q = useQuasar();

    var username = ref(null);
    var password = ref(null);

    return {
      authStore,
      username,
      password,
    };
  },
});
</script>
