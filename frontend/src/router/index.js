import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue'
import HomePage from '../views/Home.vue';
import TimesheetPage from '../views/Timesheet.vue';
import SettingsPage from '../views/Settings.vue';
import AdminPage from '../views/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/timesheet',
    name: 'Timesheet',
    component: TimesheetPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(), //if base url needed, "process.env.BASE_URL" in ().
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;