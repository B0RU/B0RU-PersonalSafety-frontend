import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import AdminPanel from '../views/AdminPanel.vue';
import RegisterPersonnel from '../components/RegisterPersonnel.vue';
import RegisterManager from '../components/RegisterManager.vue';
import AdminActions from '../components/AdminActions.vue';
import RegionalDistribution from '../components/RegionalDistribution.vue';
import trackingMap from '../components/trackingMap.vue';
import ManagerPanel from '../views/Manager.vue';
import AgentPanel from '../views/AgentPanel.vue';
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
    }, {
      path: 'requests/:id',
      name: 'AdminRequests',
      component: Requests,
    }, {
      path: 'regional-distribution',
      name: 'regionalDistribution',
      component: RegionalDistribution,
    }, {
      path: 'track-rescuers',
      name: 'adminRescuers',
      component: trackingMap,
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
      name: 'managerRequests',
      component: Requests,
    }, {
      path: 'track-rescuers',
      name: 'managerRescuers',
      component: trackingMap,
    }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/agent',
    name: 'agentPanel',
    component: AgentPanel,
    children: [{
      path: 'dashboard',
      name: 'agentDashboard',
      component: Personnel,
    }, {
      path: 'track-rescuers',
      name: 'agentRescuers',
      component: trackingMap,
    }, {
      path: 'register-rescuer',
      name: 'registerRescuer',
      component: RegisterRescuer,
    }],
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
