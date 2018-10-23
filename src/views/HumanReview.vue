<template>
  <q-table
    title="Pending Messages"
    :data="tableData"
    :columns="columns"
    row-key="stixId"
  >
  <q-tr slot="body" slot-scope="props" :props="props">
    <q-td key="id" :props="props">{{ pendingList[0].stix_id }}</q-td>
    <q-td key="date" :props="props">{{ pendingList[0].date }}</q-td>
    <q-td key="type" :props="props">{{ pendingList[0].object_type }}</q-td>
    <q-td key="field" :props="props">{{ pendingList[0].field_name }}</q-td>
    <q-td key="value" :props="props">
      {{ props.row.value }}
      <q-popup-edit v-model="props.row.value">
        <q-input v-model="props.row.value" />
    </q-popup-edit>
    </q-td>

    <q-td key="status" :props="props">{{ pendingList[0].status }}</q-td>
    <q-td key="action" :props="props">
      {{ props.row.actions }}
      <q-select v-model="select" float-label="Select Action" :options="selectOptions"/>
    </q-td>
    <q-td key="g-action" :props="props">{{ props.row.groupAction }}</q-td>
  </q-tr>
</q-table>
</template>

<script>
export default {
  created() {
    console.log('Human review component is created');
    const logmsg = 'get HR pending fields';
    console.log(logmsg);

    this.$store.dispatch('getHRPending', Object.assign({}, this.input));
    console.log('completed loading pending ....');
  },

  name: 'humanreview',
  data: () => ({
    selectOptions: [
      { label: 'Confirm Risk', value: '1' },
      { label: 'Not PII', value: '2' },
      { label: 'Redact Field', value: '3' }
    ],
    columns: [

      { name: 'id', required: true, label: 'Stix Id', align: 'left', field: 'stixId', sortable: true, style: 'width: 10px' },
      { name: 'date', label: 'Action Date', align: 'left', field: 'actionDate', sortable: true, style: 'width: 20px' },
      { name: 'type', label: 'Object Type', align: 'left', field: 'objectType', sortable: true, style: 'width: 20px' },
      { name: 'field', label: 'Field', align: 'left', field: 'field', sortable: true, style: 'width: 20px' },
      { name: 'value', label: 'Value', align: 'left', field: 'value', sortable: true, style: 'width: 50px' },
      { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, style: 'width: 10px' },
      { name: 'action', label: 'Action', align: 'left', field: 'actions', sortable: true, style: 'width: 100px' },
      { name: 'g-action', label: 'Group Action', align: 'left', field: 'groupAction', sortable: true, style: 'width: 50px' }
    ],
    tableData: [
      { stixId: '1', actionDate: '09/15/2018', objectType: 'Indicator', field: 'Title', value: 'I contain a SSN', status: 'New', groupAction: 'Disseminate' },
      { stixId: '1', actionDate: '09/15/2018', objectType: 'Indicator', field: 'Description', value: 'I contain a name', status: 'New', groupAction: 'Disseminate' },
      { stixId: '2', actionDate: '09/18/2018', objectType: 'Indicator', field: 'Title', value: 'I contain a SSN: 123-45-6789', status: 'New', groupAction: 'Disseminate' },
      { stixId: '2', actionDate: '09/18/2018', objectType: 'Indicator', field: 'Description', value: '123 Massachusetts Ave, NW, Washington DC', status: 'New', groupAction: 'Disseminate' }
    ]
    // separator: 'horizontal'
  })

/*   computed: {
    pendingList() {
      return this.$store.state.pendingList;
    },
  },

  methods: {
    getPending() {
      const logmsg = 'get HR pending fields';
      console.log(logmsg);

      this.$store.dispatch('getHRPending', Object.assign({}, this.input))
        .then(() => this.$router.push('/humanreview'));
    },
  }, */

};
</script>
