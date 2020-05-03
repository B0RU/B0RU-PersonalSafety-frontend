import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import AdminPanel from '../views/AdminPanel.vue';
import RegisterPersonnel from '../components/RegisterPersonnel.vue';
import RegisterManager from '../components/RegisterManager.vue';
import AdminActions from '../components/AdminActions.vue';
import ManagerPanel from '../views/Manager.vue';
import Personnel from '../views/personnel.vue';
import RegisterRescuer from '../views/RegisterRescuer.vue';
import ResetPassword from '../views/ResetPassword.vue';
import Requests from '../components/requests.vue';

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
    path: '/admin',
    name: 'adminPanel',
    component: AdminPanel,
    children: [{
      path: 'register-agent',
      name: 'registerAgent',
      component: RegisterPersonnel,
    }, {
      path: 'register-manager',
      name: 'registerManager',
      component: RegisterManager,
    }, {
      path: 'dashboard',
      name: 'adminDashboard',
      component: AdminActions,
    }],
    meta: {
      requiresAuth: true,
    },
  }, {
    path: '/manager',
    name: 'managerPanel',
    component: ManagerPanel,
    children: [{
      path: 'dashboard',
      name: 'managerDashboard',
      component: AdminActions,
    }, {
      path: 'requests/:id',
      name: 'requests',
      component: Requests,
    }],
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
  {
    path: '/personnel/register-rescuer',
    name: 'RegisterRescuer',
    component: RegisterRescuer,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/personnel/resetPassword',
    name: 'resetPassword',
    component: ResetPassword,
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
