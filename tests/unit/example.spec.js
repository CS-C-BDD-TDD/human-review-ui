import{ mount, createLocalVue } from '@vue/test-utils'
import Quasar from 'quasar'
import LogIn from '@/components/LogIn.vue'
import iconSet from 'quasar-framework/icons/fontawesome';

describe('Test Default.vue', () => {
  let localVue, vm;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Quasar, {
      config: {}, iconSet,
    });
    vm = mount(LogIn, { localVue });
  });

  it('Loads the default View', () => {
    expect(vm.find('input[type=text]')).toBePresent();
  });
});