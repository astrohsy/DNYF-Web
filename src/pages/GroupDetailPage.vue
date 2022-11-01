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

const rows = [
  {
    name: "Hoseung Lee",
    phone: "929-462-2432",
    email: "hl3605@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Adam Smith",
    phone: "123-456-1234",
    email: "as1234@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Hoseung Lee",
    phone: "929-462-2432",
    email: "hl3605@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Adam Smith",
    phone: "123-456-1234",
    email: "as1234@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Hoseung Lee",
    phone: "929-462-2432",
    email: "hl3605@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Adam Smith",
    phone: "123-456-1234",
    email: "as1234@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Hoseung Lee",
    phone: "929-462-2432",
    email: "hl3605@columbia.edu",
    comment: "prefer to meet before the evening",
  },
  {
    name: "Adam Smith",
    phone: "123-456-1234",
    email: "as1234@columbia.edu",
    comment: "prefer to meet before the evening",
  },
];

export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
