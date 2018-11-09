import { defineFeature, loadFeature } from "jest-cucumber";
import Quasar from "quasar-framework";
import { mount, createLocalVue } from "@vue/test-utils";
import ReviewItem from "@/components/ReviewItem.vue";
import iconSet from "quasar-framework/icons/fontawesome";
import "quasar-extras/fontawesome";

const feature = loadFeature("tests/unit/features/ReviewItem.feature");
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
    stix_id: "1",
    original_date: "09/15/2018",
    object_type: "Indicator",
    field_name: "Title",
    field_value: "I contain a SSN",
    status: "New"
  };

  const givenIHaveDataForAnReviewItem = given => {
    given("data for an individual review item", () => {
      propData = TEST_DATA;
    });
  };

  /**
   * There really is not operation here, but we need a `when` clause
   */
  const whenIRendertheReviewItemComponent = when => {
    when("I render the review item component", () => {
      wrapper = mount(ReviewItem, { propsData: propData });
    });
  };

  test("Displaying a review item", ({ given, when, then }) => {
    /**
     * Load our Default layout into the Vue rendering engine
     */
    givenIHaveDataForAnReviewItem(given);

    whenIRendertheReviewItemComponent(when);
    // /**
    //  * There really is not operation here, but we need a `when` clause
    //  */
    // when("I render the review item component", () => {
    //   wrapper = mount(ReviewItem, propData);
    // });

    then("I should see a Stix Id", () => {
      let td = wrapper.find("td:nth-child(1)");
      expect(td.html()).toContain(TEST_DATA.stix_id);
    });  

    then("I should see an Action Date", () => {
      let td = wrapper.find("td:nth-child(2)");
      expect(td.html()).toContain(TEST_DATA.original_date);
    });

    then("I should see an Object Type", () => {
      let td = wrapper.find("td:nth-child(3)");
      expect(td.html()).toContain(TEST_DATA.object_type);
    });

    then("I should see a Field Name", () => {
      let td = wrapper.find("td:nth-child(4)");
      expect(td.html()).toContain(TEST_DATA.field_name);
    });

    then("I should see a Field Value as a Popup Edit component", () => {
      let td = wrapper.find("td:nth-child(5)");
      expect(td.html()).toContain(TEST_DATA.field_value);
    });

    then("I should see a Status", () => {
      let td = wrapper.find("td:nth-child(6)");
      expect(td.html()).toContain(TEST_DATA.status);
    });

    then("I should see an Action Combo box", () => {
      let select = wrapper.find("div.q-input-target.ellipsis");
      expect(select.html()).toContain("Redact Field");
    });
  });

  test("Modify the value of a review item", ({ given, when, then }) => {
    /**
     * Load our Default layout into the Vue rendering engine
     */
    givenIHaveDataForAnReviewItem(given);

    whenIRendertheReviewItemComponent(when);

    when("I select the value", () => {
      const valueField = wrapper.find("td.cursor-pointer");
      valueField.trigger("click");
    });

    when("I change the value", () => {
      const inputField = wrapper.find("input.q-input-target.q-no-input-spinner.ellipsis");
      inputField.setValue(TEST_VALUE_INPUT);
    });

    when(/^I click Set$/, () => {
      const setButton = wrapper.find("button.q-btn:nth-child(2)");
      setButton.trigger("click");
    });

    then("the underlying data object should be updated", () => {
      let eventData = TEST_DATA;
      eventData.fieldValue = TEST_VALUE_INPUT;
      expect(wrapper.emitted("fieldValueUpdate")).toBeDefined();
      expect(wrapper.emitted("fieldValueUpdate").length).toEqual(1);
      expect(wrapper.emitted("fieldValueUpdate")[0][0]).toEqual(eventData);
    });
  });
});
