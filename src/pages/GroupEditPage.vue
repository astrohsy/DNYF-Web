<template>
  <q-page padding>
    <q-card bordered class="bg-white-9 my-card fixed-center">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Group Title *"
            hint="Include the purpose of group"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="capacity"
            label="Group Capacity *"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Please type your capacity in integer',
              (val) =>
                (val > 0 && val < 1000) ||
                'Please type a valid capacity (< 1000)',
            ]"
          />

          <!-- <q-input v-model="text" filled type="textarea"></q-input> -->
          <q-editor
            v-model="text"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
            }"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              to="/"
              label="Back"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { useGroupStore } from "src/stores/group";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

const groupStore = useGroupStore();

export default defineComponent({
  name: "GroupEditPage",
  methods: {
    async onSubmit() {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      });

      const tokenInfo = await this.$auth0.getAccessTokenSilently({
        detailedResponse: true,
      });
      const config = {
        headers: { Authorization: `Bearer ${tokenInfo.id_token}` },
      };

      this.groupStore.createGroup(config, {
        group_name: this.name,
        group_capacity: parseInt(this.capacity),
        //text: this.text,
      });
    },
    onReset() {
      console.log("onReset called");
      this.name.value = null;
      this.capacity.value = null;
      this.text.value = null;
    },
  },
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const capacity = ref(null);
    const text = ref(null);

    return {
      $q,
      name,
      capacity,
      text,
      groupStore,
    };
  },
});
</script>
