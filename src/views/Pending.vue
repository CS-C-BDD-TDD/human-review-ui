<template>
   <q-table
    title="Pending Messages"
    :data="pendingList"
    :columns="columns"
    :visible-columns="visibleColumns"
    row-key="id"
    class="bg-white"
  >
  <q-tr slot="body" slot-scope="props" :props="props" >
    <q-td key="id" :props="props">{{ props.row.id }}</q-td>
    <q-td key="stixid" :props="props">{{ props.row.stix_id }}</q-td>
    <q-td key="odate" :props="props">{{ props.row.original_date }}</q-td>
    <q-td key="mdate" :props="props">{{ props.row.modified_date }}</q-td>
    <q-td key="type" :props="props">{{ props.row.object_type }}</q-td>
    <q-td key="field" :props="props">{{ props.row.field_name }}</q-td>
    <q-td key="value" :props="props">
      {{ props.row.field_value }}
      <q-popup-edit v-model="props.row.field_value" @save="fieldValueUpdate(props)" buttons>
        <q-input v-model="props.row.field_value" />
    </q-popup-edit>
    </q-td>
    <q-td key="status" :props="props">{{ props.row.status }}</q-td>
    <q-td key="action" :props="props">
      {{ props.row.action }}
      <q-select v-model="props.row.select" float-label="Select Action" :options="selectOptions"
        @input="updateAction(props.row)"/>
    </q-td>
  </q-tr>
  </q-table>
</template>

<script>
export default {
  name: 'pending',

  data: () => ({
    columns: [
      { name: 'id', label: 'Id', align: 'left', field: 'id', sortable: true, style: 'width: 5px' },       
      { name: 'stixid', required: true, label: 'Stix Id', align: 'left', field: 'stix_id', sortable: true, style: 'width: 20px' },
      { name: 'odate', label: 'Original Date', align: 'left', field: 'original_date', sortable: true, style: 'width: 15px' },
      { name: 'mdate', label: 'Modified Date', align: 'left', field: 'modified_date', sortable: true, style: 'width: 15px' },
      { name: 'type', label: 'Object Type', align: 'left', field: 'object_type', sortable: true, style: 'width: 10px' },
      { name: 'field', label: 'Field', align: 'left', field: 'field_name', sortable: true, style: 'width: 10px' },
      { name: 'value', label: 'Value', align: 'left', field: 'field_value', sortable: true, style: 'width: 25px' },
      { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, style: 'width: 10px' },
      { name: 'action', label: 'Action', align: 'left', field: 'actions', sortable: true, style: 'width: 20px' },
    ],
    visibleColumns: ['stixid', 'odate', 'type', 'field', 'value', 'status', 'action'],
    selectOptions: [
      { label: 'Confirm Risk', value: 'Confirm Risk' },
      { label: 'Not PII', value: 'Not PII' },
      { label: 'Redact Field', value: 'Redact' },
    ],
    select: 0,
    pendingList: null,
  }),

  mounted() {
    this.getPendingList();
  },

  computed: {
  },

  methods: {
    getPendingList: function () {
      const url = '/api/v1/humanreview/pending';
      const token = this.$route.params.token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          token: token,
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
        }).catch((error) => {
          console.log(error);
        });
    },
    updateAction: function (obj) {
      const url = '/api/v1/humanreview/' + obj.stix_id + '/' + obj.field_name;
      const token = this.$route.params.token;
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          token: token,
        },
        params: {
          field_name: obj.field_name,
          original_value: obj.field_value,
          accepted_value: obj.field_value,
          action_type: obj.select,
        },
      };

      console.log('#### updateAction ####');
      console.log('url = ', url);
      this.$axios.put(url, null, config)
        .then((response) => {
          this.getPendingList();
        }).catch((error) => {
          console.log('Failed update...');
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>
