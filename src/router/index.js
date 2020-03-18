import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPersonnel from '../components/RegisterPersonnel.vue';
import Personnel from '../components/personnel.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/admin/register-personnel',
    name: 'registerPersonnl',
    component: RegisterPersonnel,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: Personnel,
    meta: {
      requiresAuth: true,
    },
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
