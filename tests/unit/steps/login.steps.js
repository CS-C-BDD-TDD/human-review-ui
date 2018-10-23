import Vue from 'vue';
import { defineFeature, loadFeature } from "jest-cucumber";
import Quasar from "quasar-framework";
import { mount, createLocalVue } from "@vue/test-utils";
import LogIn from "@/views/LogIn.vue";
import iconSet from "quasar-framework/icons/fontawesome";
import "quasar-extras/fontawesome";

Vue.config.silent = true;

const feature = loadFeature("tests/unit/features/Login.feature");

const USERNAME = 'someUsername';
const PASSWORD = 'somePassword';
const EXPECTED_CREDENTIALS = { username: USERNAME, password: PASSWORD };
const TEST_TOKEN = 'example_token';

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
    const $axios = {};
    const $router = {};

    given('a mock instance of Axios', () => {
      /**
       * Mock implementation of the `put` method for the API client library
       */
      $axios.put = jest.fn((path, options) => {
        expect(path).toEqual('/api/v1/user');
        expect(options.username).toEqual(USERNAME);
        expect(options.password).toEqual(PASSWORD);
        let response = {
          // `data` is the response that was provided by the server
          data: TEST_TOKEN,
        
          // `status` is the HTTP status code from the server response
          status: 200,
        
          // `statusText` is the HTTP status message from the server response
          statusText: 'OK',
        };
        return Promise.resolve(response);
      });
    });

    given('a mock instance of the Vue router', () => {
      /**
       * Mock implementation of the `$router.push` method
       */
      $router.push = jest.fn((pushInfo) => {
        expect(pushInfo.name).toEqual('humanreview');
        expect(pushInfo.params).toEqual({ token: TEST_TOKEN });
      });
    });

    given('an instance of the LogIn component with our mocks injected', () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: { // Implement the mocks here!
          $axios,
          $router
        }
      });
    });

    when('I enter a valid username', () => {
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when('I enter a valid password', () => {
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    when('I click the LOGIN button', () => {
      wrapper.find('button').trigger('click');
    });

    then('I expect that the axios client will be called with appropriate parameters', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.token).toEqual(TEST_TOKEN);
      expect($axios.put).toHaveBeenCalled();
      expect($axios.put.mock.calls[0][0]).toEqual('/api/v1/user');  // Check to see if the first parameter is the expected credentials.
      expect($axios.put.mock.calls[0][1]).toEqual({ username: USERNAME, password: PASSWORD });  // Check to see if the first parameter is the expected credentials.
    });

    then('I expect that the user will have been navigated to the HumanReview page', async () => {
      await wrapper.vm.$nextTick();
      expect($router.push).toHaveBeenCalled();
      expect($router.push).toBeCalledWith({ name: 'humanreview', params: { token: TEST_TOKEN } });
    });

    then('I expect that the failed login alert is not visible', () => {
      expect(wrapper.vm.$data.failedLogin).toBeFalsy();
    });
  });

  test('Verify login logic handles invalid username properly', ({ given, when, then }) => {
    let wrapper;
    const $axios = {};

    given('a mock instance of axios', () => {
      /**
       * Mock implementation of the `put` method for the API client library
       */
      $axios.put = jest.fn((path, options) => {
        expect(path).toEqual('/api/v1/user');
        expect(options.username).toEqual(USERNAME);
        expect(options.password).toEqual(PASSWORD);
        let response = {
          // `data` is the response that was provided by the server
          data: {},
        
          // `status` is the HTTP status code from the server response
          status: 401,
        
          // `statusText` is the HTTP status message from the server response
          statusText: 'OK',
        }
        return Promise.resolve(response);
      });
    });

    given('an instance of the LogIn component with our mock injected', () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: { // Implement the mocks here!
          $axios
        }
      });
    });

    when('I enter an invalid username', () => {
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when('I enter a password', () => {
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    when('I click the LOGIN button', () => {
      wrapper.find('button').trigger('click');
    });

    then('I expect that the axios client will be called with appropriate parameters', async () => {
      await wrapper.vm.$nextTick();
      expect($axios.put).toHaveBeenCalled();
    });

    then('I expect an error message to be displayed on the Login screen', () => {
      expect(wrapper.vm.$data.failedLogin).toBeTruthy();
    });
  });

  test('The user interface should handle situations where the backend does not respond', ({ given, when, then }) => {
    let wrapper;
    const $axios = {};

    given('a mock instance of axios', () => {
      /**
       * Mock implementation of the `put` method for the API client library
       */
      $axios.put = jest.fn((path, options) => {
        expect(path).toEqual('/api/v1/user');
        expect(options.username).toEqual(USERNAME);
        expect(options.password).toEqual(PASSWORD);
        let response = {
          // `data` is the response that was provided by the server
          data: {},
        
          // `status` is the HTTP status code from the server response
          status: 401,
        
          // `statusText` is the HTTP status message from the server response
          statusText: 'OK',
        }
        return Promise.resolve(response);
      });
    });

    given('an instance of the LogIn component with our mock injected', () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: { // Implement the mocks here!
          $axios
        }
      });
    });

    when('I enter an invalid username', () => {
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when('I enter a password', () => {
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    when('I click the LOGIN button', () => {
      wrapper.find('button').trigger('click');
    });

    then('I expect that the axios client will be called with appropriate parameters', async () => {
      await wrapper.vm.$nextTick();
      expect($axios.put).toHaveBeenCalled();
    });

    then('I expect an error message to be displayed on the Login screen', () => {
      expect(wrapper.vm.$data.failedLogin).toBeTruthy();
    });
  });
});