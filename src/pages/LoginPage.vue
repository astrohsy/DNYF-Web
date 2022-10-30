<template>
  <q-page padding>
    <!-- content -->
    <div class="row login-page">
      <div class="col-3 div-3">1</div>
      <div class="col-auto">
        <q-card dark bordered class="bg-grey-9 my-card">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section> Hello!!!!! </q-card-section>
        </q-card>
      </div>
      <!--
     we have 3 children, so equivalent
     to above would be to use `col-4`
     on each of the children
  -->
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
</style>

<script>
export default {
  // name: 'PageName',
};
</script>
