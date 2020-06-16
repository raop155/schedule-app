import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Login from '../views/Login.vue';
import Schedule from '../views/Schedule.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login/:branchId?',
    name: 'Login',
    component: Login,
    props: true,
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    beforeEnter: (to, from, next) => {
      const auth = sessionStorage.getItem('logged-in');
      console.log('auth', auth);
      if (auth) {
        next();
      } else {
        sessionStorage.clear();
        next('/');
      }
    },
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  { path: '*', redirect: '/404' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
