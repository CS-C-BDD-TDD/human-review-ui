<template>
   <q-table
    title="Pending Messages"
    :columns="columns"
    row-key="stixId"
    class="bg-white"
  >
  <review-item></review-item>
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
        console.log('######## Assigned PendingList ########');
        console.log(this.pendingList[0]);
        console.log(this.pendingList[0].stix_id);
      }).catch((error) => {
        console.log(error);
      });
  },
  props: {
  },
  data: () => ({
    columns: [
      { name: 'id', required: true, label: 'Stix Id', align: 'left', field: 'stixId', sortable: true, style: 'width: 10px' },
      { name: 'date', label: 'Action Date', align: 'left', field: 'actionDate', sortable: true, style: 'width: 20px' },
      { name: 'type', label: 'Object Type', align: 'left', field: 'objectType', sortable: true, style: 'width: 20px' },
      { name: 'field', label: 'Field', align: 'left', field: 'field', sortable: true, style: 'width: 20px' },
      { name: 'value', label: 'Value', align: 'left', field: 'value', sortable: true, style: 'width: 50px' },
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
