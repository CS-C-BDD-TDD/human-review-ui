<template>
  <q-page class="bg-light">
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
      <q-popup-edit v-model="props.row.field_value" @save="updateValues(props.row, 'Edit')" buttons>
        <q-input v-model="props.row.field_value" />
      </q-popup-edit>
     </q-td>
     <q-td key="status" :props="props">{{ props.row.status }}</q-td>
     <q-td key="action" :props="props">
      <q-select v-model="props.row.action" float-label="Select Action" :options="selectOptions"
        @input="updateValues(props.row, props.row.action)"/>
     </q-td>
     <q-td key="groupaction" :props="props">
      <q-btn color="primary" label="Disseminate" size="12px"
        @click="performGroupAction(props.row.stix_id, 'Disseminate')"/>
     </q-td>
   </q-tr>
   </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'pending',

  data: () => ({
    columns: [
      { name: 'id', label: 'Id', align: 'left', field: 'id', sortable: true, style: 'width: 5px' },       
      { name: 'stixid', required: true, label: 'Stix Id', align: 'left', field: 'stix_id', sortable: true, style: 'width: 10px' },
      { name: 'odate', label: 'Original Date', align: 'left', field: 'original_date', sortable: true, style: 'width: 5px' },
      { name: 'mdate', label: 'Modified Date', align: 'left', field: 'modified_date', sortable: true, style: 'width: 5px' },
      { name: 'type', label: 'Object Type', align: 'left', field: 'object_type', sortable: true, style: 'width: 5px' },
      { name: 'field', label: 'Field', align: 'left', field: 'field_name', sortable: true, style: 'width: 10px' },
      { name: 'value', label: 'Value', align: 'left', field: 'field_value', sortable: true, style: 'width: 10px' },
      { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true, style: 'width: 5px' },
      { name: 'action', label: 'Action', align: 'left', field: 'actions', sortable: true, style: 'width: 5px' },
      { name: 'groupaction', label: 'Group Action', align: 'left', field: 'group_action', sortable: false, style: 'width: 5px' },
    ],
    visibleColumns: ['stixid', 'odate', 'type', 'field', 'value', 'status', 'action', 'groupaction'],
    selectOptions: [
      { label: 'Confirm Risk', value: 'Confirm Risk' },
      { label: 'Not PII', value: 'Not PII' },
      { label: 'Redact Field', value: 'Redact' },
    ],
    pendingList: null,
    originalReviewItemData: null,
  }),

  mounted() {
    this.getPendingList();
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
          this.pendingList = response.data;
          this.originalReviewItemData = this.pendingList;
          console.log('######## Size of Pending List: ', this.pendingList.length, ' #######');
        }).catch((error) => {
          console.log(error);
        });
    },
    updateValues: function (obj, action) {
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
          action_type: action,
        },
      };

      console.log('######## updateValues ########');
      console.log('url = ', url);
      console.log(config);
      this.$axios.put(url, null, config)
        .then((response) => {
          if (response.status === 200 || response.status === 202) {
            this.getPendingList();
          } else {
            console.log(response);
          }
        }).catch((error) => {
          console.log('Failed update...');
          console.log(error);
        });
    },

    performGroupAction: function (id, action) {
      console.log('######## Disseminate ########');
      const url = '/api/v1/humanreview/' + id;
      const token = this.$route.params.token;

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          token: token,
        },
        params: {
          stix_id: id,
          group_action: action,
        },
      };

      this.$axios.put(url, null, config)
        .then((response) => {
          if (response.status === 200 || response.status === 202) {
            console.log('GroupAction success!');
            this.getPendingList();
          } else {
            console.log('GroupAction:', response);
          }
        }).catch((error) => {
          console.error('GroupAction failed.');
          console.error(error);
        });
    },
  },
};
</script>

<style>
</style>
