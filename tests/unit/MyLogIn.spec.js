import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import { __createMocks as createStoreMocks } from '../../src/store';

import LogIn from '../../src/components/LogIn.vue';

jest.mock('../../src/store');

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Test LogIn js', () => {
  let storeMocks;
  let wrapper;

  beforeEach(() => {
    // Create a fresh store and wrapper
    // instance for every test case.
    storeMocks = createStoreMocks();
    wrapper = shallow(LogIn, {
      store: storeMocks.store,
      localVue,
    });
  });

  test('It should get token.', () => {
    wrapper.find('button').trigger('click');
    expect(storeMocks.actions.getLoginToken).toBeCalled();
  });
});
