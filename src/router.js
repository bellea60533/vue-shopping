import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Products from '@/components/Products.vue';
import Coupons from '@/components/Coupons.vue';
import Order from '@/components/Order.vue';
import VisualOrder from '@/components/VisualOrder.vue';


// import Home from '@/components/pages/Home.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: 
      [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'order',
          name: 'Order',
          component: Order,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: 
      [
        {
          path: 'visual_order',
          name: 'VisualOrder',
          component: VisualOrder
        }
      ]
    }
  ]
})
