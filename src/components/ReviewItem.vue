Vue.component('review-item', {
<template>
    <q-tr>
        <q-td key="stixId">{{ stixId }}</q-td>
        <q-td key="date">{{ actionDate }}</q-td>
        <q-td key="objectType">{{ objectType }}</q-td>
        <q-td key="fieldName">{{ fieldName }}</q-td>
        <q-td key="fieldValue">
            {{ fieldValue }}
            <q-popup-edit v-model="fieldValue" @save="fieldValueUpdate" buttons>
                <q-input v-model="reviewItemData.fieldValue" />
            </q-popup-edit>
        </q-td>
        <q-td key="status">{{ status }}</q-td>
        <q-td key="action">
            {{ actions }}
            <q-select v-model="select" float-label="Select Action" 
                      :options="selectOptions" @change="updateAction"/>
        </q-td>
    </q-tr>
</template>
})

<script>
export default {
    props: {
      stixId: { type: String, required: true },
      actionDate: { type: String, required: true },
      objectType: { type: String, required: true },
      fieldName: { type: String, required: true },
      fieldValue: { type: String, required: true },
      status: { type: String, required: true }
    },
    data: () => {
        return {
            reviewItemData: {},
            selectOptions: [
                { label: 'Confirm Risk', value: '1' },
                { label: 'Not PII', value: '2' },
                { label: 'Redact Field', value: '3' }
            ],
            select: 0
        } 
    },
    methods: {
        fieldValueUpdate: function(val, initVal) {
            let eventData = {
                stixId: this.stixId,
                actionDate: this.actionDate,
                objectType: this.objectType,
                fieldName: this.fieldName,
                fieldValue: this.reviewItemData.fieldValue,
                status: this.status,
                action: this.action
            };
            eventData.fieldValue = this.reviewItemData.fieldValue;
            this.$emit("fieldValueUpdate", eventData);
        },
        updateAction: function(val, initVal) {
            this.$emit("updateAction", { stixId: this.stixId, fieldName: this.fieldName, action: this.select });
        }
    },
    mounted: function() {
        this.reviewItemData.fieldValue = this.fieldValue;
        this.select = this.selectOptions[2].value;
    }
}
</script>

<style>
</style>
