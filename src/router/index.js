import {createRouter, createWebHistory } from 'vue-router';

import landing from '../components/landing.vue';
import register from '../auth/register.vue';
import login from '../auth/login.vue';
import { authGuard } from '../router/authGuard.js';
import dashboard from '../components/dashboard.vue';
import Mytickets from '../components/MyTickets.vue';


const routes = [
  { path: '/', component: landing },
  { path: '/register', component: register },
  { path: '/login', component: login },
  { 
    path: '/dashboard', 
    component: dashboard,
    beforeEnter: authGuard
  },
  { 
    path: '/mytickets', 
    component: Mytickets,
    beforeEnter: authGuard
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;