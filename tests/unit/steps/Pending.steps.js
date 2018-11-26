import Vue from 'vue';
import { defineFeature, loadFeature } from "jest-cucumber";
import Quasar from "quasar-framework";
import { mount, createLocalVue } from "@vue/test-utils";
import pending from "@/views/Pending.vue";
import iconSet from "quasar-framework/icons/fontawesome";
import "quasar-extras/fontawesome";

Vue.config.silent = true;

const feature = loadFeature("tests/unit/features/Pending.feature");
const TEST_VALUE_INPUT = "This is my test value";
const TEST_API_TOKEN = 'Random-0.7354678706053357';

defineFeature(feature, test => {
  let localVue;
  let propData;
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
        "id": 4,
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
        "id": 5,
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
        "id": 6,
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
        "id": 7,
        "stix_id": "bundle--c9567f73-3803-415c-b06e-2b0622830e5d",
        "field_name": "name",
        "field_value": "Disco Team Threat Actor Group",
        "field_location": "$.objects[1].name",
        "original_date": "2018-11-21T10:40:16-05:00",
        "modified_date": "2018-11-21T10:40:16-05:00",
        "object_type": "objects",
        "status": "Redacted",
        "action": "Redact Field"
    },
    {
        "id": 8,
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

  const givenIHaveDataForATable = given => {
    given("data for a table", () => {
      propData = TEST_DATA;
    });
  };

  /**
   * There really is not operation here, but we need a `when` clause
   */
  const whenIRendertheTableComponent = when => {
    when("I render the table component", () => {
      wrapper = mount(pending, { propsData: propData });
    });
  };

  test("Displaying a table", ({ given, when, then }) => {
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

    then("I should see a Stix Id Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(1)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].stix_id);
      }
    });

    then("I should see an Original Date Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(2)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].original_date);
      }
    });

    then("I should see a Type Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(3)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].object_type);
      }
    });

    then("I should see a Field Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(4)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].field_name);
      }
    });

    then("I should see a Value Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(5)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].field_value);
      }
    });

    then("I should see a Status Column", () => {
      for (let i = 1; i <= TEST_DATA.length; i++) {
        let selector = `table tr:nth-child(${i}) td:nth-child(6)`;
        let td = wrapper.find(selector);
        expect(td.html()).toContain(TEST_DATA[i-1].status);
      }
    })

//    then("I should see Action Combo boxes", () => {
//      let select = wrapper.find("div.q-input-target.ellipsis.justify-start")[0];
//      expect(select.html()).toContain(TEST_DATA[0].action);
//      select = wrapper.find("div.q-input-target.ellipsis")[1];
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(3)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(4)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(5)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(6)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(7)");
//      expect(select.html()).toContain("Redact Field");
//    });
  });

  // test("Modify the value of a table item with an action", ({ given, when, then }) => {
  //   /**
  //    * Load our Default layout into the Vue rendering engine
  //    */
  //   givenIHaveDataForATable(given);

  //   whenIRendertheTableComponent(when);

  //   when("I select a table value", () => {
  //     const valueField = wrapper.find("td.cursor-pointer");
  //     valueField.trigger("click");
  //   });

  //   when("I change a table value", () => {
  //     const inputField = wrapper.find("input.q-input-target.q-no-input-spinner.ellipsis");
  //     inputField.setValue(TEST_VALUE_INPUT);
  //   });

  //   when(/^I click Set$/, () => {
  //     const setButton = wrapper.find("button.q-btn:nth-child(2)");
  //     setButton.trigger("click");
  //   });

  //   then("the underlying table value should be updated with an action", () => {
  //     let eventData = TEST_DATA;
  //     eventData.fieldValue = TEST_VALUE_INPUT;
  //     expect(wrapper.emitted("fieldValueUpdate")).toBeDefined();
  //     expect(wrapper.emitted("fieldValueUpdate").length).toEqual(1);
  //     expect(wrapper.emitted("fieldValueUpdate")[0][0]).toEqual(eventData);
  //   });
  // });

  // test("Modify the value of a table item with a group action", ({ given, when, then }) => {
  //   /**
  //    * Load our Default layout into the Vue rendering engine
  //    */
  //   givenIHaveDataForATable(given);

  //   whenIRendertheTableComponent(when);

  //   when("I select a table value", () => {
  //     const valueField = wrapper.find("td.cursor-pointer");
  //     valueField.trigger("click");
  //   });

  //   when("I change a table value", () => {
  //     const inputField = wrapper.find("input.q-input-target.q-no-input-spinner.ellipsis");
  //     inputField.setValue(TEST_VALUE_INPUT);
  //   });

  //   when(/^I click Set$/, () => {
  //     const setButton = wrapper.find("button.q-btn:nth-child(2)");
  //     setButton.trigger("click");
  //   });

  //   then("the underlying table value should be updated with a group action", () => {
  //     let eventData = TEST_DATA;
  //     eventData.fieldValue = TEST_VALUE_INPUT;
  //     expect(wrapper.emitted("fieldValueUpdate")).toBeDefined();
  //     expect(wrapper.emitted("fieldValueUpdate").length).toEqual(1);
  //     expect(wrapper.emitted("fieldValueUpdate")[0][0]).toEqual(eventData);
  //   });
  // });
});