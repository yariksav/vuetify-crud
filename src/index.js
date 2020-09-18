// Import vue components
import * as components from './grids/index'
export { default as Actions } from './actions/Actions.vue'
export { default as MenuActions } from './actions/MenuActions.vue'
// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.keys(components).forEach((componentName) => {
    Vue.component(componentName, components[componentName]);
  });
  Vue.component('CrudActions', Actions)
  Vue.component('CrudMenuActions', MenuActions)
}

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
/* global window global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export components
export * from './grids/index';
export default plugin