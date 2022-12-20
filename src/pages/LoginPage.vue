<template>
  <q-page padding>
    <!-- content -->
    <div class="row login-page">
      <div class="col-auto">
        <q-card bordered class="bg-white-9 my-card fixed-center">
          <q-card-section>
            <div class="text-h6">Login</div>
            <div class="text-subtitle2">by DNYFs</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section><LoginForm /></q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<style>
.login-page {
  min-height: inherit;
}
.div-3 {
  background-color: rgb(255, 0, 0);
}
.my-card {
  width: 100%;
  max-width: 400px;
}
</style>

<script>
import LoginForm from "src/components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  setup() {
    return {};
  },
};
</script>
