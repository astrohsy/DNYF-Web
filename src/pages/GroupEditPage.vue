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
            v-model="age"
            label="Group Capacity *"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />

          <!-- <q-input v-model="text" filled type="textarea"></q-input> -->
          <q-editor
            v-model="text"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
            }"
          />

          <q-toggle
            :key="item.name"
            v-model="item.on"
            :label="item.name"
            v-for="item in dayOfWeeks"
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
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

const data = ref(null);

export default defineComponent({
  name: "GroupEditPage",

  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const text = ref("");
    const dayOfWeeks = ref([
      { name: "Monday", on: false },
      { name: "Tuesday", on: true },
      { name: "Wednesday", on: true },
      { name: "Thursday", on: true },
      { name: "Friday", on: true },
      { name: "Saturday", on: true },
      { name: "Sunday", on: true },
    ]);

    return {
      name,
      age,
      dayOfWeeks,
      text,

      onSubmit() {
        console.log(dayOfWeeks);
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
      },

      onReset() {
        console.log("Am I called?");
        name.value = null;
        age.value = null;
      },
    };
  },
});
</script>
