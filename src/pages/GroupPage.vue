<template>
  <q-page padding>
    <GroupPost v-bind:key="item.group_id" v-for="item in items" v-bind="item" />
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
      items: groups,
    };
  },
});
</script>
