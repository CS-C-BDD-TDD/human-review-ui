<template>
    <q-table
     title="Pending Messages"
     :data="pendingList"
     :columns="columns"
     :visible-columns="visibleColumns"
     row-key="id"
     class="bg-white"
   >
   <q-alert color="red" v-if="failed_comm_backend">
     Error communicating with backend.
   </q-alert>
   <q-alert color="orange" v-if="no_success_comm_backend">
     No success communicating with backend.
   </q-alert>
   <q-tr slot="body" slot-scope="props" :props="props" >
     <q-td key="id" :props="props">{{ props.row.id }}</q-td>
     <q-td key="stixid" :props="props"
      :style="{width: '300px', whiteSpace: 'normal'}">
      {{ props.row.stix_id }}</q-td>
     <q-td key="odate" :props="props">{{ props.row.original_date }}</q-td>
     <q-td key="mdate" :props="props">{{ props.row.modified_date }}</q-td>
     <q-td key="type" :props="props">{{ props.row.object_type }}</q-td>
     <q-td key="field" :props="props">{{ props.row.field_name }}</q-td>
     <q-td key="value" :props="props"
       :style="{width: '250px', whiteSpace: 'normal'}">
       {{ props.row.field_value }}
      <q-popup-edit v-model="props.row.field_value" @save="updateValues(props.row, 'Edit')" buttons>
        <q-input v-model="props.row.field_value" />
      </q-popup-edit>
     </q-td>
     <q-td key="status" :props="props">{{ props.row.status }}</q-td>
     <q-td key="action" :props="props">
      <q-alert color="red" 
       v-if="failed_action == true && (props.row.action == 'Confirm Risk' || props.row.action == 'Not PII' || props.row.action == 'Redact')">
        Action Error communicating with backend.
      </q-alert>
      <q-alert color="orange" 
       v-if="no_success_action == true && (props.row.action == 'Confirm Risk' || props.row.action == 'Not PII' || props.row.action == 'Redact')">
        Action not successful.
      </q-alert>
      <q-select v-model="props.row.action" float-label="Select Action" :options="selectOptions"
        @input="updateValues(props.row, props.row.action)"/>
     </q-td>
     <q-td key="groupaction" :props="props">
      <q-alert color="red" 
       v-if="failed_group_action == true  && (props.row.groupaction == 'Disseminate') || (props.row.groupaction == 'Do Not Disseminate')">
        Group Action Error communicating with backend.
      </q-alert>
      <q-alert color="orange" 
       v-if="no_success_group_action == true && (props.row.groupaction == 'Disseminate') || (props.row.groupaction == 'Do Not Disseminate')">
        Group Action not successful.
      </q-alert> 
      <q-select v-model="props.row.groupaction" float-label="Disseminate Options" :options="disseminateOptions"
        @input="performGroupAction(props.row.stix_id, props.row.groupaction)"/>
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
      { name: 'stixid', required: true, label: 'Stix Id', align: 'left', field: 'stix_id', sortable: true, style: 'width: 10px' },
      { name: 'location', label: 'Location Id', align: 'left', field: 'field_location' },
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
    disseminateOptions: [
      { label: 'Disseminate', value: 'Disseminate' },
      { label: 'Do Not Disseminate', value: 'Do Not Disseminate' },
    ],

    pendingList: [],
     
    no_success_group_action: false,
    no_success_action: false,
    no_success_comm_backend: false,
    failed_group_action: false,
    failed_action: false,
    failed_comm_backend: false,

    originalReviewItemData: [],
  }),

  mounted() {
    this.getPendingList();
  },

  methods: {

    getPendingList:  function () {
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
          this.failed_comm_backend = false;
          console.log('######## Size of Pending List: ', this.pendingList.length, ' #######');
          if (response.status === 200 || response.status === 202) {
            this.no_success_comm_backend = false;
          } else {
            /* MFF 01/04/19:  Added No Success Action Error Message flag */
            this.no_success_comm_backend = true;
            console.log(response);
          }
        }).catch((error) => {
          /* MFF 12/06/18:  Added Error Message */
          this.failed_comm_backend = true;
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
      };
      const requestBody = {
        original_value: obj.field_value,
        field_location: obj.field_location,
        action_type: action,
        accepted_value: obj.field_value,
      };

      const qs = require('qs');

/*       console.log('######## updateValues ########');
      console.log('url = ', url);
      console.log(config); */

      this.$axios.put(url, qs.stringify(requestBody), config)
        .then((response) => {
          if (response.status === 200 || response.status === 202) {
            this.getPendingList();
            this.no_success_action = false;
            this.failed_action = false;
          } else {
            /* MFF 12/06/18:  Added No Success Action Error Message flag */
            this.no_success_action = true;
            console.log(response);
          }
        }).catch((error) => {
          /* MFF 12/06/18:  Added Action Error Message flag */
          this.failed_action = true;
          console.log('Failed update...');
          console.log(error);
        });
    },

    performGroupAction: function (id, action) {
      console.log('######## Group Action ########');
      console.log(action);
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
            this.no_success_group_action = false;
            this.failed_group_action = false;
          } else {
            /* MFF 12/07/18:  Added No Success Group Action Message flag */
            this.no_success_group_action = true;
            console.log('GroupAction: other than success', response);
          }
        }).catch((error) => {
          /* MFF 12/07/18:  Added Group Action Error Message flag */
          this.failed_group_action = true;
          console.error('GroupAction failed.');
          console.error(error);
        }); 
    },
  },
};
</script>

<style>
</style>
