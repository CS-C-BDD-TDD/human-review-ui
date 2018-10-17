import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import { __createMocks as createStoreMocks } from '../../src/store';

import HumanReview from '../../src/components/HumanReview.vue';

jest.mock('../../src/store');

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Test HumanReview js', () => {
  let storeMocks;
  let wrapper;

  beforeEach(() => {
    // Create a fresh store and wrapper
    // instance for every test case.
    storeMocks = createStoreMocks();
    wrapper = shallow(HumanReview, {
      store: storeMocks.store,
      localVue,
    });
  });

  test('It should get token.', () => {
    expect(storeMocks.actions.getHRPending).toBeCalled();
  });
});
