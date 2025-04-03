import { createRouter, createWebHistory } from 'vue-router';
//import LandingPage from '../views/Landing.vue' //may be of use later, we'll see.
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
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage
  },
  {
    path: '/timesheet',
    name: 'Timesheet',
    component: TimesheetPage
  }
];

const router = createRouter({
  history: createWebHistory(), //if base url needed, "process.env.BASE_URL" in ().
  routes
});


export default router;