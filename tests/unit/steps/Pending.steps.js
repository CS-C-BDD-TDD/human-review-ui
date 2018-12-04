import Vue from 'vue';
import { defineFeature, loadFeature } from "jest-cucumber";
import Quasar from "quasar-framework";
import { mount, createLocalVue } from "@vue/test-utils";
import pending from "@/views/Pending.vue";
import  { updateValues } from "@/views/Pending.vue"
import iconSet from "quasar-framework/icons/fontawesome";
import "quasar-extras/fontawesome";

Vue.config.silent = true;

const feature = loadFeature("tests/unit/features/Pending.feature");
const TEST_VALUE_INPUT = "This is my test value";
const TEST_API_TOKEN = 'Random-0.7354678706053357';
const TEST_OPTIONS = ['Confirm Risk', 'Not PII', 'Redact'];

defineFeature(feature, test => {
  let localVue;
  let wrapper;
  /**
   * Initialize the Vue.js rendering engine with Quasar and font-awesome
   */
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Quasar, {
      config: {},
      iconSet: iconSet
    });
  });

  const TEST_DATA = [
    {
      "id": 1,
      "stix_id": "bundle--c9567f73-3803-415c-b06e-2b0622830e5d",
      "field_name": "description",
      "field_value": "This organized threat actor group operates to create profit from all types of crime.",
      "field_location": "$.objects[0].description",
      "original_date": "2018-11-21T10:29:14-05:00",
      "modified_date": "2018-11-21T10:29:14-05:00",
      "object_type": "objects",
      "status": "New",
      "action": ""
    },
    {
      "id": 2,
      "stix_id": "bundle--c9567f73-3803-415c-b06e-2b0622830e5d",
      "field_name": "primary_motivation",
      "field_value": "personal-gain",
      "field_location": "$.objects[0].primary_motivation",
      "original_date": "2018-11-21T10:29:14-05:00",
      "modified_date": "2018-11-21T10:29:14-05:00",
      "object_type": "objects",
      "status": "Confirmed",
      "action": "Confirm Risk"
    },
    {
      "id": 3,
      "stix_id": "bundle--c9567f73-3803-415c-b06e-2b0622830e5d",
      "field_name": "name",
      "field_value": "Disco Team Threat Actor Group",
      "field_location": "$.objects[0].name",
      "original_date": "2018-11-21T10:29:14-05:00",
      "modified_date": "2018-11-21T10:29:14-05:00",
      "object_type": "objects",
      "status": "Edited",
      "action": "Confirm Risk"
    },
    {
      "id": 4,
      "stix_id": "bundle--c9567f73-3803-415c-b06e-2b0622830e5d",
      "field_name": "title",
      "field_value": "Disco Team Threat Actor Group Title",
      "field_location": "$.objects[1].title",
      "original_date": "2018-11-21T10:40:16-05:00",
      "modified_date": "2018-11-21T10:40:16-05:00",
      "object_type": "objects",
      "status": "Redacted",
      "action": "Redact",
    },
    {
      "id": 5,
      "stix_id": "bundle--c9567f73-3803-415c-b06e-2b06228aae5d",
      "field_name": "name",
      "field_value": "Disco Team Threat Actor Group",
      "field_location": "$.objects[1].name",
      "original_date": "2018-11-21T10:40:16-05:00",
      "modified_date": "2018-11-21T10:40:16-05:00",
      "object_type": "objects",
      "status": "Not PII",
      "action": "Not PII"
    }
 ];

  test("Rendering a table on page", ({ given, when, then }) => {
    let $axios = {};
    let $route = {};

    given(/^a mock instance of Axios and Vue Router$/, () => {
      $axios.get = jest.fn((url, config) => {
        expect(url).toEqual('/api/v1/humanreview/pending');
        expect(config.headers.token).toEqual(TEST_API_TOKEN);
        expect(config.headers['Content-Type']).toEqual('application/json');
        let response = {
          // 'data' is the response that was provided by the server
          data: TEST_DATA,
          // 'status' is the HTTP status code from the server response
          status: 200,
          // 'statusText' is the HTTP status message from the server response
          statusText: 'OK'
        };
        return Promise.resolve(response);
      });

      $route.params = {token: TEST_API_TOKEN};
    });

    when("I render the table component", () => {
      wrapper = mount(pending, {localVue,
        mocks: {    // Implement the mocks here!
          $axios,
          $route
        }
      });
    });

    then("I should inspect the Stix Id Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(1)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].stix_id);
      }
    });

    then("I should inspect the Original Date Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(2)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].original_date);
      }
    });

    then("I should inspect the Type Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(3)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].object_type);
      }
    });

    then("I should inspect the Field Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(4)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].field_name);
      }
    });

    then("I should inspect the Value Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(5)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].field_value);
      }
    });

    then("I should inspect the Status Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(6)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].status);
      }
    })

    then("I should inspect the Action Combo boxes", () => {
      for (let i = 0; i < TEST_DATA.length; i++) {
        let selector = "div.col.q-input-target.ellipsis.justify-start";
        let item = wrapper.findAll(selector).at(i);
        expect(item).toBeDefined();
        expect(item.html()).toContain(TEST_DATA[i].action);
      }
    });
   });

  test("Performing an action", ({ given, when, then }) => {
    let $axios = {};
    let $route = {};
    let action = "";
    let newValues = {
      stix_id: TEST_DATA[0].stix_id,
      field_location: TEST_DATA[0].field_location,
      field_name: TEST_DATA[0].field_name,
      original_value: TEST_DATA[0].field_value,
      accepted_value: TEST_DATA[0].field_value,
      action_type: action
    };

    given(/^a mock instance of Axios and Vue Router$/, () => {
      $axios.get = jest.fn((url, config) => {
        expect(url).toEqual('/api/v1/humanreview/pending');
        expect(config.headers.token).toEqual(TEST_API_TOKEN);
        expect(config.headers['Content-Type']).toEqual('application/json');
        let response = {
          // 'data' is the response that was provided by the server
          data: TEST_DATA,
          // 'status' is the HTTP status code from the server response
          status: 200,
          // 'statusText' is the HTTP status message from the server response
          statusText: 'OK'
        };
        return Promise.resolve(response);
      });

      $route.params = {token: TEST_API_TOKEN};
    });

     given(/^a mock instance of Axios put$/, () => {

      $axios.put = jest.fn((url, requestBody, config) => {
        expect(url).toEqual('/api/v1/humanreview/'
          + TEST_DATA[0].stix_id + '/' + TEST_DATA[0].field_name);
        expect(config.headers.token).toEqual(TEST_API_TOKEN);
        expect(config.headers['Content-Type'])
          .toEqual('application/x-www-form-urlencoded');
        let response = {
          // 'data' is the response that was provided by the server
          // 'status' is the HTTP status code from the server response
          status: 200,
          // 'statusText' is the HTTP status message from the server response
          statusText: 'OK'
        };
        return Promise.resolve(response);
      });

      $route.params = {token: TEST_API_TOKEN};
    });

    when("I render the table component", () => {
      wrapper = mount(pending, {localVue,
        mocks: {    // Implement the mocks here!
          $axios,
          $route,
        }
      });
    });

    then(/^I select an (.*)$/, action => {
      newValues.action = action;
    });

    then("I verify updateValues", () => {
      expect(wrapper.vm.updateValues(newValues, action)).toBeDefined;
      expect($axios.put).toHaveBeenCalled();
      expect($axios.put).toHaveBeenCalledTimes(1);
    });
   });
});