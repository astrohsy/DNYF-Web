<template>
  <q-page padding>
    <GroupPost v-bind:key="item.group_id" v-for="item in items" v-bind="item" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import GroupPost from "src/components/GroupPost.vue";

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

export default defineComponent({
  name: "GroupPage",

  components: {
    GroupPost,
  },

  setup() {
    return {
      items: groups,
    };
  },
});
</script>
