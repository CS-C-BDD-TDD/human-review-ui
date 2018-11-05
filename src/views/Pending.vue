<template>
   <q-table
    title="Pending Messages"
    :data="pendingList"
    :columns="columns"
    row-key="id"
    class="bg-white"
  >
  <q-tr v-for="item in pendingList" slot="body" slot-scope="props" :props="props" >
    <q-td key="id" :props="props">{{ props.row.stix_id }}</q-td>
    <q-td key="odate" :props="props">{{ props.row.original_date }}</q-td>
    <q-td key="mdate" :props="props">{{ props.row.modified_date }}</q-td>
    <q-td key="type" :props="props">{{ props.row.object_type }}</q-td>
    <q-td key="field" :props="props">{{ props.row.field_name }}</q-td>
    <q-td key="value" :props="props">
      {{ props.row.field_value }}
      <q-popup-edit v-model="props.row.field_value">
        <q-input v-model="props.row.field_value" />
    </q-popup-edit>
    </q-td>
    <q-td key="status" :props="props">{{ props.row.status }}</q-td>
    <q-td key="action" :props="props">
      {{ props.row.action }}
      <q-select v-model="select" float-label="Select Action" :options="selectOptions"/>
    </q-td>
  </q-tr>
  </q-table>
</template>

<script>
export default {
  name: 'pending',
  mounted() {
    const url = '/api/v1/humanreview/pending';
    const token = this.$route.params.token;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
    };

    console.log('######## Pending Page ########');
    // Access the '$axios' client via the 'this' object and send the request.
    // We will then recieve a 'Promise' which contains the 'response' object
    // from the Axios client.
    this.$axios.get(url, config)
      .then((response) => {
        //console.log(response.data);
        this.pendingList = response.data;
        console.log('######## Size of Pending List: ' + this.pendingList.length + ' #######');
        this.tableData = this.pendingList;
      }).catch((error) => {
        console.log(error);
      });
  },
  data: () => ({
    columns: [
      { name: 'id', required: true, label: 'Stix Id', align: 'left', field: 'stix_id', sortable: true, style: 'width: 10px' },
      { name: 'odate', label: 'Original Date', align: 'left', field: 'original_date', sortable: true, style: 'width: 20px' },
      { name: 'mdate', label: 'Modified Date', align: 'left', field: 'modified_date', sortable: true, style: 'width: 20px' },
      { name: 'type', label: 'Object Type', align: 'left', field: 'object_type', sortable: true, style: 'width: 20px' },
      { name: 'field', label: 'Field', align: 'left', field: 'field_name', sortable: true, style: 'width: 20px' },
      { name: 'value', label: 'Value', align: 'left', field: 'field_value', sortable: true, style: 'width: 50px' },
      { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, style: 'width: 10px' },
      { name: 'action', label: 'Action', align: 'left', field: 'actions', sortable: true, style: 'width: 100px' },
    ],
    pendingList: null,
  }),

  methods: {
  },
};
</script>

<style>
</style>
