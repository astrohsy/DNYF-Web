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
import { fetchGroupDetail } from "src/data/GroupDetail";
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

export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
