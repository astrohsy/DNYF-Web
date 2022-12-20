<template>
  <div class="q-pa-md">
    <q-table
      title="Participants"
      :rows="groupStore.group?.members"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            <q-badge color="green">
              {{ props.row.first_name + " " + props.row.last_name }}
            </q-badge>
          </q-td>
          <q-td key="email" :props="props">
            <q-badge color="purple">
              {{ props.row.email }}
            </q-badge>
          </q-td>
          <q-td key="phone" :props="props">
            <q-badge color="orange">
              {{ props.row.phone }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useGroupStore } from "stores/group";
const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    align: "right",
    label: "Name",
    field: (row) => row.first_name + row.last_name,
    sortable: true,
  },
  { name: "email", label: "Email", field: "email", sortable: true },
  { name: "phone", label: "Phone", field: "phone" },
];

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
    };
  },
  async mounted() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    const groupId = this.$route.params.id;
    this.groupStore.fetchGroup(config, groupId);
  },
  async created() {
    const tokenInfo = await this.$auth0.getAccessTokenSilently();
    const config = {
      headers: {
        Authorization: `Bearer ${tokenInfo}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
    const groupId = this.$route.params.id;
    this.groupStore.fetchGroup(config, groupId);
  },
});
</script>
