<template>
  <q-page padding>
    <div>
      <q-splitter v-model="splitterModel" unit="px" style="height: 90%">
        <template v-slot:before>
          <div class="q-pa-sm">
            <div class="q-pa-md">
              <div class="text-h5 q-mb-md">Search</div>
            </div>
            <q-input
              v-model="search"
              debounce="500"
              filled
              placeholder="Search by title"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div class="q-pa-md">
              <q-option-group
                v-model="group"
                type="checkbox"
                :options="options"
              >
                <template v-slot:label="opt">
                  <div class="row items-center">
                    <span class="text-teal">{{ opt.label }}</span>
                  </div>
                </template>
              </q-option-group>
            </div>

            <q-btn
              to="/group-edit"
              label="Create Group"
              rounded
              color="primary"
              icon="groups"
              no-caps
            />
          </div>
        </template>

        <template v-slot:after>
          <div class="q-pa-md">
            <GroupPost
              v-bind:key="item.group_id"
              v-for="item in items"
              v-bind="item"
            />
          </div>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import { fetchGroup } from "src/data/Group";
import { defineComponent, ref } from "vue";
import GroupPost from "src/components/GroupPost.vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const groups = fetchGroup();
const data = ref(null);

export default defineComponent({
  name: "GroupPage",

  components: {
    GroupPost,
  },

  setup() {
    const $q = useQuasar();
    const data = ref(null);
    function loadData() {
      api
        .get("/breeds/image/random")
        .then((response) => {
          data.value = response.data;
          console.log(data.value);
        })
        .catch(() => {
          $q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    }
    loadData();
    return {
      splitterModel: ref(250),
      items: groups,
      group: ref(["op1"]),

      options: [
        {
          value: "op1",
          label: "Monday",
          icon: "restaurant_menu",
        },
        {
          value: "op2",
          label: "Tuesday",
          icon: "room_service",
          color: "teal",
        },
        {
          value: "op3",
          label: "Wednesday",
          icon: "photo",
          color: "teal",
        },
        {
          value: "op4",
          label: "Thursday",
          icon: "photo",
          color: "teal",
        },
        {
          value: "op5",
          label: "Friday",
          icon: "photo",
          color: "teal",
        },
        {
          value: "op6",
          label: "Saturday",
          icon: "photo",
          color: "teal",
        },
        {
          value: "op7",
          label: "Sunday",
          icon: "photo",
          color: "teal",
        },
      ],
    };
  },
});
</script>
