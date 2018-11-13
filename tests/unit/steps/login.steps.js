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

  test('Login with valid credentials', ({given, when, then}) => {
    let $axios = {};
    let $router = {};
    const USERNAME = 'User1';
    const PASSWORD = 'Pass1';
    const TOKEN = 'Random-0.7354678706053357';

    given(/^a mock instance of Axios$/, () => {
      /**
       * Mock implementation of the 'put' method for the API client library
       */
      $axios.put = jest.fn((path, options) => {
        expect(path).toEqual('/api/v1/user');
        expect(options.username).toEqual(USERNAME);
        expect(options.password).toEqual(PASSWORD);
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

    given(/^a mock instance of the Vue router$/, ()=> {
      $router.push = jest.fn((pushOpts) => {
        expect(pushOpts.name).toEqual('pending');
        expect(pushOpts.params.token).toEqual(TOKEN);   
      })
    });

    given(/^an instance of the LogIn component with our mocks injected$/, () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: {    // Implement the mocks here!
          $axios,
          $router
        }
      });
    });

    when(/^I enter a username$/, () => {
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when(/^I enter a password$/, () => {
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    when(/^I click the SignIn button$/, () => {
      wrapper.find('button.q-btn').trigger('click');
    });

    then(/^I expect the username value to be set correctly$/, () => {
      expect(wrapper.vm.$data.username).toBe(USERNAME);
    });

    then(/^I expect the password value to be set correctly$/, () => {
      expect(wrapper.vm.$data.password).toBe(PASSWORD);
    });

    then(/^I expect that the axios client will be called with appropriate parameters$/, async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.token).toEqual(TOKEN);
      expect($axios.put).toHaveBeenCalled();
      // Check to see if the first parameter is the expected path
      expect($axios.put.mock.calls[0][0]).toEqual('/api/v1/user');
      // Check to see if the second parameter is the expected credentials.
      expect($axios.put.mock.calls[0][1]).toEqual({ username: USERNAME, password: PASSWORD });
    });

    then('I expect that the user will have been navigated to the HumanReview page', async () => {
      await wrapper.vm.$nextTick();
      expect($router.push).toHaveBeenCalled();
      expect($router.push).toBeCalledWith({ name: 'pending', params: { token: TOKEN } });
    });

    then('I expect that the failed login alert is not visible', () => {
      expect(wrapper.vm.$data.failedLogin).toBeFalsy();
    });
  });

  test('Login with invalid credentials', ({given, when, then}) => {
    let $axios = {};
    const USERNAME = 'WrongUser';
    const PASSWORD = 'WrongPassword';
    const MESSAGE = 'invalid credential';

    given(/^a mock instance of Axios$/, () => {
      /**
       * Mock implementation of the 'put' method for the API client library
       */
      $axios.put = jest.fn((path, options) => {
        expect(path).toEqual('/api/v1/user');
        expect(options.username).toEqual(USERNAME);
        expect(options.password).toEqual(PASSWORD);
        let response = {
          // 'data' is the response that was provided by the server
          data: MESSAGE,
          // 'status' is the HTTP status code from the server response
          status: 401,
          statusText: 'UNAUTHORIZED'
        };
        return Promise.resolve(response);
      });
    });

/*     given(/^a mock instance of the Vue router$/, ()=> {
      $router.push = jest.fn((pushOpts) => {
        expect(pushOpts.name).toEqual('humanreview');
        expect(pushOpts.params.token).toEqual(TOKEN);   
      })
    }); */

    given(/^an instance of the LogIn component with our mocks injected$/, () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: {    // Implement the mocks here!
          $axios,
          // $router
        }
      });
    });

    when(/^I enter a username$/, () => {
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when(/^I enter a password$/, () => {
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    when(/^I click the SignIn button$/, () => {
      wrapper.find('button.q-btn').trigger('click');
    });

    then(/^I expect the username value to be set correctly$/, () => {
      expect(wrapper.vm.$data.username).toBe(USERNAME);
    });

    then(/^I expect the password value to be set correctly$/, () => {
      expect(wrapper.vm.$data.password).toBe(PASSWORD);
    });

    then(/^I expect that the axios client will be called with appropriate parameters$/, async () => {
      await wrapper.vm.$nextTick();
      expect($axios.put).toHaveBeenCalled();
      // Check to see if the first parameter is the expected path
      expect($axios.put.mock.calls[0][0]).toEqual('/api/v1/user');
      // Check to see if the second parameter is the expected credentials.
      expect($axios.put.mock.calls[0][1]).toEqual({ username: USERNAME, password: PASSWORD });
    });

    then(/^I expect that the axios client will receive an invalid message$/, async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.errmsg).toEqual(MESSAGE);
    });

    then('I expect that the failed login alert is visible', () => {
      expect(wrapper.vm.$data.failedLogin).toBeTruthy();
      expect(wrapper.html()).toContain('Login failed');
    });
  });

  test('Login failure due to a connectivity problem', ({given, when, then}) => {
    let $axios = {};
    const USERNAME = 'User1';
    const PASSWORD = 'Pass1';

    given(/^a mock instance of Axios$/, () => {
      /**
       * Mock implementation of the 'put' method for the API client library
       */
      $axios.put = jest.fn((path, options) => {
        expect(path).toEqual('/api/v1/user');
        expect(options.username).toEqual(USERNAME);
        expect(options.password).toEqual(PASSWORD);
        let error = {
          // 'data' is the response that was provided by the server
          data: '',
          // 'status' is the HTTP status code from the server response
          status: 406,
          //statusText: 'UNAUTHORIZED'
        };
        return Promise.reject(error);
      });
    });

/*     given(/^a mock instance of the Vue router$/, ()=> {
      $router.push = jest.fn((pushOpts) => {
        expect(pushOpts.name).toEqual('humanreview');
        expect(pushOpts.params.token).toEqual(TOKEN);   
      })
    }); */

    given(/^an instance of the LogIn component with our mocks injected$/, () => {
      wrapper = mount(LogIn, {
        localVue,
        mocks: {    // Implement the mocks here!
          $axios,
        }
      });
    });

    when(/^I enter a username$/, () => {
      wrapper.find('input[type=text]').setValue(USERNAME);
    });

    when(/^I enter a password$/, () => {
      wrapper.find('input[type=password]').setValue(PASSWORD);
    });

    when(/^I click the SignIn button$/, () => {
      wrapper.find('button.q-btn').trigger('click');
    });

    then(/^I expect the username value to be set correctly$/, () => {
      expect(wrapper.vm.$data.username).toBe(USERNAME);
    });

    then(/^I expect the password value to be set correctly$/, () => {
      expect(wrapper.vm.$data.password).toBe(PASSWORD);
    });

    then(/^I expect that the axios client will be called with appropriate parameters$/, async () => {
      await wrapper.vm.$nextTick();
      expect($axios.put).toHaveBeenCalled();
      // Check to see if the first parameter is the expected path
      expect($axios.put.mock.calls[0][0]).toEqual('/api/v1/user');
      // Check to see if the second parameter is the expected credentials.
      expect($axios.put.mock.calls[0][1]).toEqual({ username: USERNAME, password: PASSWORD });
    });

    then('I expect that the failed login alert is visible', () => {
      expect(wrapper.vm.$data.failedLogin).toBeTruthy();
      expect(wrapper.html()).toContain('Login failed');
    });
  });
});