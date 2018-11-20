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

  const TEST_DATA = {
    id: ["1", "2", "3", "4", "5", "6", "7"],
    stixid: [ "1", "2", "3", "4", "5", "6", "7"],
    odate: [ "09/15/2018", "09/20/2018", "09/21/2018",
            "09/22/2018", "09/23/2018",  "09/24/2018", "09/25/2018"],
    mdate: ["09/15/2018", "09/20/2018", "09/21/2018",
            "09/22/2018", "09/23/2018",  "09/24/2018", "09/25/2018"],
    type: [ "Indicator", "Indicator", "Indicator", 
                  "Indicator", "Indicator", "Indicator", "Indicator"],
    field: ["Title", "Title", "Title", "Title", "Title", "Title", "Title"],
    original_value: [ "I contain a SSN", "I contain a SSN", "I contain a SSN",
            "I contain a SSN", "I contain a SSN", "I contain a SSN",
            "I contain a SSN"],
    accepted_value: [ "I contain a SSN", "I contain a SSN", "I contain a SSN",
            "I contain a SSN", "I contain a SSN", "I contain a SSN",
            "I contain a SSN"],
    status: [ "New", "New", "New", "New", "New", "New", "New"],
    action: [],
    groupaction: []
  };

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
    
    given(/^a mock instance of params$/, () => {
      /**
       * Mock implementation
       */
      $route.put = jest.fn((params, options) => {
        expect(params).toEqual(TEST_DATA);

        for (idx = 0; idx < 7; idx++)
        {
          expect(options.field_name[idx]).toEqual(TEST_DATA.field[idx]);
          expect(options.original_value[idx]).toEqual(TEST_DATA.original_value[idx]);
          expect(options.accepted_value[idx]).toEqual(TEST_DATA.accepted_value[idx]);
          expect(options.action_type[idx]).toEqual(TEST_DATA.action[idx]);
          expect(options.stix_id[idx]).toEqual(TEST_DATA.stix_id[idx]);
          expect(options.group_action[idx]).toEqual(TEST_DATA.group_action[idx]);
        }

        let response = {
          // 'data' is the response that was provided by the server
          data: TOKEN,
          // 'status' is the HTTP status code from the server response
          status: 200,
          // 'statusText' is the HTTP status message from the server response
          statusText: 'OK'
        };
        return Promise.resolve(response);
      });
    });
    
    /**
     * Load our Default layout into the Vue rendering engine
     */
    givenIHaveDataForATable(given);

    whenIRendertheTableComponent(when);
    // /**
    //  * There really is not operation here, but we need a `when` clause
    //  */
    // when("I render the review item component", () => {
    //   wrapper = mount(ReviewItem, propData);
    // });

    then("I should see a Stix Id Column", () => {
      let td = wrapper.find("td:nth-child(1)");
      expect(td.html()).toContain(TEST_DATA.stixid[0]);
      td = wrapper.find("td:nth-child(2)");
      expect(td.html()).toContain(TEST_DATA.stixid[1]);
      td = wrapper.find("td:nth-child(3)");
      expect(td.html()).toContain(TEST_DATA.stixid[2]);
      td = wrapper.find("td:nth-child(4)");
      expect(td.html()).toContain(TEST_DATA.stixid[3]);
      td = wrapper.find("td:nth-child(5)");
      expect(td.html()).toContain(TEST_DATA.stixid[4]);
      td = wrapper.find("td:nth-child(6)");
      expect(td.html()).toContain(TEST_DATA.stixid[5]);
      td = wrapper.find("td:nth-child(7)");
      expect(td.html()).toContain(TEST_DATA.stixid[6]);
    });  

    then("I should see an O Date Column", () => {
      let td = wrapper.find("td:nth-child(8)");
      expect(td.html()).toContain(TEST_DATA.oDate[0]);
      td = wrapper.find("td:nth-child(9)");
      expect(td.html()).toContain(TEST_DATA.oDate[1]);
      td = wrapper.find("td:nth-child(10)");
      expect(td.html()).toContain(TEST_DATA.oDate[2]);
      td = wrapper.find("td:nth-child(11)");
      expect(td.html()).toContain(TEST_DATA.oDate[3]);
      td = wrapper.find("td:nth-child(12)");
      expect(td.html()).toContain(TEST_DATA.oDate[4]);
      td = wrapper.find("td:nth-child(13)");
      expect(td.html()).toContain(TEST_DATA.oDate[5]);
      td = wrapper.find("td:nth-child(14)");
      expect(td.html()).toContain(TEST_DATA.oDate[6]);
    });

    then("I should see an M Date Column", () => {
      let td = wrapper.find("td:nth-child(8)");
      expect(td.html()).toContain(TEST_DATA.mDate[0]);
      td = wrapper.find("td:nth-child(9)");
      expect(td.html()).toContain(TEST_DATA.mDate[1]);
      td = wrapper.find("td:nth-child(10)");
      expect(td.html()).toContain(TEST_DATA.mDate[2]);
      td = wrapper.find("td:nth-child(11)");
      expect(td.html()).toContain(TEST_DATA.mDate[3]);
      td = wrapper.find("td:nth-child(12)");
      expect(td.html()).toContain(TEST_DATA.mDate[4]);
      td = wrapper.find("td:nth-child(13)");
      expect(td.html()).toContain(TEST_DATA.mDate[5]);
      td = wrapper.find("td:nth-child(14)");
      expect(td.html()).toContain(TEST_DATA.mDate[6]);
    });

    then("I should see a Type Column", () => {
      let td = wrapper.find("td:nth-child(15)");
      expect(td.html()).toContain(TEST_DATA.type[0]);
      td = wrapper.find("td:nth-child(16)");
      expect(td.html()).toContain(TEST_DATA.type[1]);
      td = wrapper.find("td:nth-child(17)");
      expect(td.html()).toContain(TEST_DATA.type[2]);
      td = wrapper.find("td:nth-child(18)");
      expect(td.html()).toContain(TEST_DATA.type[3]);
      td = wrapper.find("td:nth-child(19)");
      expect(td.html()).toContain(TEST_DATA.type[4]);
      td = wrapper.find("td:nth-child(20)");
      expect(td.html()).toContain(TEST_DATA.type[5]);
      td = wrapper.find("td:nth-child(21)");
      expect(td.html()).toContain(TEST_DATA.type[6]);   
    });

    then("I should see a Field Column", () => {
      let td = wrapper.find("td:nth-child(22)");
      expect(td.html()).toContain(TEST_DATA.field[0]);
      td = wrapper.find("td:nth-child(23)");
      expect(td.html()).toContain(TEST_DATA.field[1]);
      td = wrapper.find("td:nth-child(24)");
      expect(td.html()).toContain(TEST_DATA.field[2]);
      td = wrapper.find("td:nth-child(25)");
      expect(td.html()).toContain(TEST_DATA.field[3]);
      td = wrapper.find("td:nth-child(26)");
      expect(td.html()).toContain(TEST_DATA.field[4]);
      td = wrapper.find("td:nth-child(27)");
      expect(td.html()).toContain(TEST_DATA.field[5]);
      td = wrapper.find("td:nth-child(28)");
      expect(td.html()).toContain(TEST_DATA.field[6]);
    });

    then("I should see a Value Column", () => {
      let td = wrapper.find("td:nth-child(29)");
      expect(td.html()).toContain(TEST_DATA.value[0]);
      td = wrapper.find("td:nth-child(30)");
      expect(td.html()).toContain(TEST_DATA.value[1]);
      td = wrapper.find("td:nth-child(31)");
      expect(td.html()).toContain(TEST_DATA.value[2]);
      td = wrapper.find("td:nth-child(32)");
      expect(td.html()).toContain(TEST_DATA.value[3]);
      td = wrapper.find("td:nth-child(33)");
      expect(td.html()).toContain(TEST_DATA.value[4]);
      td = wrapper.find("td:nth-child(34)");
      expect(td.html()).toContain(TEST_DATA.value[5]);
      td = wrapper.find("td:nth-child(35)");
      expect(td.html()).toContain(TEST_DATA.value[6]);      
    });

    then("I should see a Status Column", () => {
      let td = wrapper.find("td:nth-child(36)");
      expect(td.html()).toContain(TEST_DATA.status[0]);
      td = wrapper.find("td:nth-child(37)");
      expect(td.html()).toContain(TEST_DATA.status[1]);
      td = wrapper.find("td:nth-child(38)");
      expect(td.html()).toContain(TEST_DATA.status[2]);
      td = wrapper.find("td:nth-child(39)");
      expect(td.html()).toContain(TEST_DATA.status[3]);
      td = wrapper.find("td:nth-child(40)");
      expect(td.html()).toContain(TEST_DATA.status[4]);
      td = wrapper.find("td:nth-child(41)");
      expect(td.html()).toContain(TEST_DATA.status[5]);
      td = wrapper.find("td:nth-child(42)");
      expect(td.html()).toContain(TEST_DATA.status[6]);  
    });

//    then("I should see Action Combo boxes", () => {
//      let select = wrapper.find("div.q-input-target.ellipsis(1)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(2)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(3)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(4)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(5)");
//      expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(6)");
//     expect(select.html()).toContain("Redact Field");
//      select = wrapper.find("div.q-input-target.ellipsis(7)");
//      expect(select.html()).toContain("Redact Field");
//    });
  });

  test("Modify the value of a table item with an action", ({ given, when, then }) => {
    /**
     * Load our Default layout into the Vue rendering engine
     */
    givenIHaveDataForATable(given);

    whenIRendertheTableComponent(when);

    when("I select a table value", () => {
      const valueField = wrapper.find("td.cursor-pointer");
      valueField.trigger("click");
    });

    when("I change a table value", () => {
      const inputField = wrapper.find("input.q-input-target.q-no-input-spinner.ellipsis");
      inputField.setValue(TEST_VALUE_INPUT);
    });

    when(/^I click Set$/, () => {
      const setButton = wrapper.find("button.q-btn:nth-child(2)");
      setButton.trigger("click");
    });

    then("the underlying table value should be updated with an action", () => {
      let eventData = TEST_DATA;
      eventData.fieldValue = TEST_VALUE_INPUT;
      expect(wrapper.emitted("fieldValueUpdate")).toBeDefined();
      expect(wrapper.emitted("fieldValueUpdate").length).toEqual(1);
      expect(wrapper.emitted("fieldValueUpdate")[0][0]).toEqual(eventData);
    });
  });

  test("Modify the value of a table item with a group action", ({ given, when, then }) => {
    /**
     * Load our Default layout into the Vue rendering engine
     */
    givenIHaveDataForATable(given);

    whenIRendertheTableComponent(when);

    when("I select a table value", () => {
      const valueField = wrapper.find("td.cursor-pointer");
      valueField.trigger("click");
    });

    when("I change a table value", () => {
      const inputField = wrapper.find("input.q-input-target.q-no-input-spinner.ellipsis");
      inputField.setValue(TEST_VALUE_INPUT);
    });

    when(/^I click Set$/, () => {
      const setButton = wrapper.find("button.q-btn:nth-child(2)");
      setButton.trigger("click");
    });

    then("the underlying table value should be updated with a group action", () => {
      let eventData = TEST_DATA;
      eventData.fieldValue = TEST_VALUE_INPUT;
      expect(wrapper.emitted("fieldValueUpdate")).toBeDefined();
      expect(wrapper.emitted("fieldValueUpdate").length).toEqual(1);
      expect(wrapper.emitted("fieldValueUpdate")[0][0]).toEqual(eventData);
    });
  });
});