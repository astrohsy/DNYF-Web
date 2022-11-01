<template>
  <q-page padding>
    <!-- content -->
    <div class="row login-page">
      <div class="col-auto">
        <q-card bordered class="bg-white-9 my-card fixed-center">
          <q-card-section>
            <div class="text-h6">Sign Up</div>
            <div class="text-subtitle2">by DNYFs</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section><SignupForm /></q-card-section>
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
  display: inline-block;
}
</style>

<script>
import SignupForm from "src/components/SignupForm.vue";
export default {
  name: "SignupPage",
  components: {
    SignupForm,
  },
};
</script>
