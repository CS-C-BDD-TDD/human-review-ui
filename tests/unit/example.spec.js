import{ shallowMount, createLocalVue } from '@vue/test-utils'
import Quasar from 'quasar'
import LogIn from './components/LogIn.vue'
import iconSet from 'quasar-framework/icons/fontawesome';

describe('Test LogIn.vue', () => {
  let localVue, vm;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Quasar, {
      config: {}, iconSet,
    });
    vm = shallowMount(LogIn, { localVue });
  });

  it('Loads the default View', () => {
    expect(vm.find('input[type=text]')).toBeDefined();
  });
});