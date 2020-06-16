import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  position: 'bottom-center' as const, // ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']
  duration: 2000,
  // type: 'default', // ['default', 'success', 'info', 'error']
  fullWidth: true,
  // fitToScreen: true,
  // singleton: true,
  className: 'toasted-class-custom',
  containerClass: 'toasted-containerClass-custom',
});

// Vue toasted register events
Vue.toasted.register(
  'default',
  (data) => {
    // if there is no message passed show default message
    if (!data.message) {
      return 'Success Toast';
    }

    // if there is a message show it with the message
    return data.message;
  },
  {
    type: 'default', // ['default', 'success', 'info', 'error']
  }
);

Vue.toasted.register(
  'success',
  (data) => {
    // if there is no message passed show default message
    if (!data.message) {
      return 'Success Toast';
    }

    // if there is a message show it with the message
    return data.message;
  },
  {
    type: 'success', // ['default', 'success', 'info', 'error']
  }
);

Vue.toasted.register(
  'error',
  (data) => {
    // if there is no message passed show default message
    if (!data.message) {
      return 'Error Toast';
    }

    // if there is a message show it with the message
    return data.message;
  },
  {
    type: 'error', // ['default', 'success', 'info', 'error']
  }
);

Vue.toasted.register(
  'info',
  (data) => {
    // if there is no message passed show default message
    if (!data.message) {
      return 'Information Toast';
    }

    // if there is a message show it with the message
    return data.message;
  },
  {
    type: 'info', // ['default', 'success', 'info', 'error']
  }
);

// Test
/* Vue.toasted.global.default();
Vue.toasted.global.success();
Vue.toasted.global.error();
Vue.toasted.global.info();

Vue.toasted.show('Show');
Vue.toasted.success('Success');
Vue.toasted.error('Error');
Vue.toasted.info('Information');
 */

export default Toasted;
