<template>
  <q-page padding>
    <div>
      <q-splitter v-model="splitterModel" unit="px" style="height: 600px">
        <template v-slot:before>
          <div class="q-pa-md">
            <div class="text-h4 q-mb-md">Before</div>
            <div v-for="n in 20" :key="n" class="q-my-md">
              {{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Quis praesentium cumque magnam odio iure quidem, quod illum
              numquam possimus obcaecati commodi minima assumenda consectetur
              culpa fuga nulla ullam. In, libero.
            </div>
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
import { defineComponent, ref } from "vue";
import GroupPost from "src/components/GroupPost.vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const groups = [
  {
    group_id: 1,
    group_name: "Operating Systems 1 Midterm Practice",
    group_capacity: 8,
    group_image_url: "images/group-preview-picture-1.jpg",
    links: [
      {
        href: "/groups/1",
        rel: "self",
        type: "GET",
      },
      {
        href: "/groups/1/members",
        rel: "get_members",
        type: "GET",
      },
      {
        href: "/groups/1",
        rel: "delete_group",
        type: "DELETE",
      },
      {
        href: "/groups/1",
        rel: "edit_group",
        type: "PUT",
      },
    ],
  },
  {
    group_id: 2,
    group_name: "Wanna see Haliton together?",
    group_capacity: 3,
    group_image_url: "images/hamilton-poster.jpg",
    links: [
      {
        href: "/groups/2",
        rel: "self",
        type: "GET",
      },
      {
        href: "/groups/2/members",
        rel: "get_members",
        type: "GET",
      },
      {
        href: "/groups/2",
        rel: "delete_group",
        type: "DELETE",
      },
      {
        href: "/groups/2",
        rel: "edit_group",
        type: "PUT",
      },
    ],
  },
];

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
      splitterModel: ref(150),
      items: groups,
    };
  },
});
</script>
