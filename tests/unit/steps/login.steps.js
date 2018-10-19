import Vue from 'vue';
import { defineFeature, loadFeature } from "jest-cucumber";
import Quasar from "quasar-framework";
import { mount, createLocalVue } from "@vue/test-utils";
import LogIn from "@/views/LogIn.vue";
import iconSet from "quasar-framework/icons/fontawesome";
import "quasar-extras/fontawesome";

Vue.config.silent = true;

const feature = loadFeature("tests/unit/features/Login.feature");

defineFeature(feature, test => {
  let localVue;
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

  test("Login page is correctly rendered", ({ given, when, then }) => {
    let wrapper;

    const USERNAME = 'someUsername';
    const PASSWORD = 'somePassword';
    const EXPECTED_CREDENTIALS = { username: USERNAME, password: PASSWORD };

    given(/^I am a user with a web browser$/, () => {
      wrapper = mount(LogIn, { localVue });
    });

    when(/^I load the default Vue JS page$/, () => {
      
    });

    when(/^I input a username$/, () => {
      expect(wrapper.find('input[type=text]').element).toBeDefined();
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when(/^I input a password$/, () => {
      expect(wrapper.find('input[type=password]').element).toBeDefined();
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    then(/^I expect the username value to be set correctly$/, () => {
        expect(wrapper.vm.$data).toBeDefined();
        expect(wrapper.vm.$data.username).toBeDefined();
        expect(wrapper.vm.$data.username).toBe(USERNAME);
    });

    then(/^I expect the password value to be set correctly$/, () => {
        expect(wrapper.vm.$data.password).toBeDefined();
        expect(wrapper.vm.$data.password).toBe(PASSWORD);
    });
  });

  test('Verify login logic works in LogIn component', ({ given, when, then }) => {
    let wrapper;
    const $api = {};
    const $router = {};

    given('a mock instance of the API client', () => {
      /**
       * Mock implementation of the `userPut` method for the API client library
       */
      $api.userPut = jest.fn((credentials, callback) => {
        expect(credentials.username).toEqual('username');
        expect(credentials.password).toEqual('password');
        callback(null, 'example_token', {});
      });
    });

    given('a mock instance of the Vue router', () => {
      /**
       * Mock implementation of the `$router.push` method
       */
      $router.push = jest.fn((pushInfo) => {
        expect(pushInfo.name).toEqual('humanreview');
        expect(pushInfo.params).toEqual({ token: 'example_token' });
      });
    });

    given('an instance of the LogIn component with our mocks injected', () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: { // Implement the mocks here!
          $api,
          $router
        }
      });
    });

    when('I enter a valid username', () => {
      wrapper.find('input[type=text]').setValue('username');
    });

    when('I enter a valid password', () => {
      wrapper.find('input[type=password]').setValue('password');
    });

    when('I click the LOGIN button', () => {
      wrapper.find('button').trigger('click');
    });

    then('I expect that the REST API Client will be called with appropriate parameters', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.token).toEqual('example_token');
      expect($api.userPut).toHaveBeenCalled();
    });

    then('I expect that the user will have been navigated to the HumanReview page', () => {
      expect($router.push).toHaveBeenCalled();
    });

    then('I expect that the failed login alert is not visible', () => {
      expect(wrapper.vm.$data.failedLogin).toBeFalsy();
    });
  });

  test('Verify login logic handles invalid username properly', ({ given, when, then }) => {
    let wrapper;
    const $api = {};

    given('a mock instance of the API client', () => {
      /**
       * Mock implementation of the `userPut` method for the API client library
       */
      $api.userPut = jest.fn((credentials, callback) => {
        expect(credentials.username).toEqual('username');
        expect(credentials.password).toEqual('password');
        callback('Invalid username and/or password', null, {});
      });
    });

    given('an instance of the LogIn component with our mock injected', () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: { // Implement the mocks here!
          $api
        }
      });
    });

    when('I enter an invalid username', () => {
      wrapper.find('input[type=text]').setValue('username');
    });

    when('I enter a password', () => {
      wrapper.find('input[type=password]').setValue('password');
    });

    when('I click the LOGIN button', () => {
      wrapper.find('button').trigger('click');
    });

    then('I expect that the REST API Client will be called with appropriate parameters', async () => {
      await wrapper.vm.$nextTick();
      expect($api.userPut).toHaveBeenCalled();
    });

    then('I expect an error message to be displayed on the Login screen', () => {
      expect(wrapper.vm.$data.failedLogin).toBeTruthy();
    });
  });
});