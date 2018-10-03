import{ shallowMount, createLocalVue } from '@vue/test-utils'
import Router from 'vue-router'
import Quasar from 'quasar'
import LogIn from './components/LogIn.vue'
import Default from './layouts//Default.vue'
import iconSet from 'quasar-framework/icons/fontawesome';

describe('Test LogIn.vue', () => {
  let localVue, wrapper;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Router);
    localVue.use(Quasar, {
      config: {}, iconSet,
    });
  });

  it('Loads the LogIn View', () => {
    wrapper = shallowMount(LogIn, { localVue });
    expect(wrapper.find('input[type=text]')).toBeDefined();
  });

  it('Loads the Default view', () => {
    wrapper = shallowMount(Default, { localVue });
    expect(wrapper.html()).toContain('YellowDog')
  });
});