import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Products from '@/components/Products.vue';
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
        }
      ]
    }
  ]
})
