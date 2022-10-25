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
    group_name: "Hello",
    group_capacity: 1,
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
    group_name: "Hello 2",
    group_capacity: 2,
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
