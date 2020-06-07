import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// GeneralViews
import NotFound from '../pages/NotFoundPage.vue';
import DashboardLayout from '../layout/dashboard/DashboardLayout.vue';

// Admin pages
import Dashboard from '../pages/Dashboard.vue';
import Maps from '../pages/Maps.vue';
import Events from '../pages/Events.vue';
// import Home from '../views/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPersonnel from '../components/RegisterPersonnel.vue';
import RegisterManager from '../components/RegisterManager.vue';
import AdminActions from '../components/AdminActions.vue';
import RegionalDistribution from '../components/RegionalDistribution.vue';
import AgentRequest from '../components/AgentRequest.vue';
import RegisterRescuer from '../components/RegisterRescuer.vue';
import ResetPassword from '../pages/ResetPassword.vue';
import Requests from '../components/requests.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
    component: LoginPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/agent',
    name: 'agentPanel',
    component: DashboardLayout,
    redirect: 'agent/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'agentDashboard',
        component: AgentRequest,
      },
      {
        path: 'maps',
        name: 'agentMaps',
        component: Maps,
      },
      {
        path: 'register-rescuer',
        name: 'registerRescuer',
        component: RegisterRescuer,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: 'admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Admindashboard',
        component: Dashboard,
      },
      {
        path: 'departments',
        name: 'adminDepartments',
        component: AdminActions,
      },
      {
        path: 'maps',
        name: 'adminMaps',
        component: Maps,
      },
      {
        path: 'events',
        name: 'adminEvents',
        component: Events,
      },
      {
        path: 'register-agent',
        name: 'registerAgent',
        component: RegisterPersonnel,
      },
      {
        path: 'register-manager',
        name: 'registerManager',
        component: RegisterManager,
      },
      {
        path: 'requests/:id',
        name: 'AdminRequests',
        component: Requests,
      },
      {
        path: 'regional-distribution',
        name: 'regionalDistribution',
        component: RegionalDistribution,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manager',
    name: 'managerPanel',
    component: DashboardLayout,
    redirect: 'manager/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'managerDashboard',
        component: Dashboard,
      },
      {
        path: 'departments',
        name: 'managerDepartments',
        component: AdminActions,
      },
      {
        path: 'maps',
        name: 'managerMaps',
        component: Maps,
      },
      {
        path: 'events',
        name: 'managerEvents',
        component: Events,
      },
      {
        path: 'requests/:id',
        name: 'managerRequests',
        component: Requests,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: ResetPassword,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '*', component: NotFound },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',

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
