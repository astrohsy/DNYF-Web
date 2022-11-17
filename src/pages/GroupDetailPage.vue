<template>
  <div class="q-pa-md">
    <q-table
      title="Participants"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="phone" :props="props">
            <q-badge color="green">
              {{ props.row.phone }}
            </q-badge>
          </q-td>
          <q-td key="email" :props="props">
            <q-badge color="purple">
              {{ props.row.email }}
            </q-badge>
          </q-td>
          <q-td key="comment" :props="props">
            <q-badge color="orange">
              {{ props.row.comment }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { fetchGroupDetail } from "src/data/GroupDetail";
import { useGroupStore } from "stores/group";
const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "phone",
    align: "right",
    label: "Phone",
    field: "phone",
    sortable: true,
  },
  { name: "email", label: "Email", field: "email", sortable: true },
  { name: "comment", label: "Comment", field: "comment" },
];

const rows = fetchGroupDetail();

export default defineComponent({
  name: "GroupPost",
  props: {
    group_id: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const groupStore = useGroupStore();
    return {
      groupStore,
      columns,
      rows,
    };
  },
  mounted() {
    console.log(this.props);
    console.log(this.$route);
    console.log(groupId);
    const groupId = this.$route.params.id;
    this.groupStore.fetchGroup(groupId);
  },
  created() {
    const groupId = this.$route.params.id;
    this.groupStore.fetchGroup(groupId);
  },
});
</script>
