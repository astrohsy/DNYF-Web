<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Group Title *"
          hint="Include the purpose of group"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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

        <q-input v-model="text" filled type="textarea"></q-input>
        <q-toggle v-model="accept" label="Monday" />
        <q-toggle v-model="accept" label="Tuesday" />
        <q-toggle v-model="accept" label="Wednesday" />
        <q-toggle v-model="accept" label="Thursday" />
        <q-toggle v-model="accept" label="Friday" />
        <q-toggle v-model="accept" label="Saturday" />
        <q-toggle v-model="accept" label="Sunday" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    Description:
    <div class="q-pa-md q-gutter-sm">
      <q-editor
        v-model="editor"
        :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
        }"
      />
    </div>
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
    const accept = ref(false);

    return {
      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
});
</script>
