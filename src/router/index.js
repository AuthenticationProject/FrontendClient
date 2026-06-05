import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/AuthCard.vue'),
    },
    {
      path: '/about',
      name: 'about',
      
      component: () => import('../components/AuthCard.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      
      component: () => import('../views/Dashboard.vue'),
    },
    {
      path: '/shop',
      name: 'shop',
      
      component: () => import('../views/Shop.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      
      component: () => import('../components/Cart.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      
      component: () => import('../components/Profile.vue'),
    },
  ],
})

export default router
