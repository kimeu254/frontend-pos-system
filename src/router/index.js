import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/user-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DashboardLayout.vue'),
      meta: {
        middleware: 'auth'
      },
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            title: `POS System - Dashboard`
          }
        },
        {
          path: '/user/my-profile',
          name: 'profile',
          component: () => import('@/views/setting/account/ProfileView.vue'),
          meta: {
            title: `User Profile - POS System`
          }
        },
        {
          path: '/user/account/change-password',
          name: 'change-password',
          component: () => import('@/views/setting/account/ChangePassword.vue'),
          meta: {
            title: `Change your password - POS System`
          }
        },
        {
          path: '/brands',
          name: 'brands',
          component: () => import('@/views/product/brand/BrandView.vue'),
          meta: {
            title: `Brands - POS System`
          }
        },
        {
          path: '/brand/create',
          name: 'new-brand',
          component: () => import('@/views/product/brand/CreateView.vue'),
          meta: {
            title: `New Brand - POS System`
          }
        },
        {
          path: '/brand/edit/:id',
          name: 'edit-brand',
          component: () => import('@/views/product/brand/EditView.vue'),
          params: true,
          meta: {
            title: `Edit Brand - POS System`
          }
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('@/views/product/category/CategoryView.vue'),
          meta: {
            title: `Categories - POS System`
          }
        },
        {
          path: '/category/create',
          name: 'new-category',
          component: () => import('@/views/product/category/CreateView.vue'),
          meta: {
            title: `New Category - POS System`
          }
        },
        {
          path: '/category/edit/:id',
          name: 'edit-category',
          component: () => import('@/views/product/category/EditView.vue'),
          params: true,
          meta: {
            title: `Edit Category - POS System`
          }
        },
      ]
    },
    {
      path: '/auth/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        middleware: 'guest',
        title: `Sign in to your account - POS System`
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else{
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            left: 0,
            top: 0,
            behavior: 'smooth',
          })
        }, 500)
      })
    }
  },
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  document.title = to.meta.title
  if (to.meta.middleware === ('auth') && !userStore.token) next({ name: 'login' })
  else if(to.meta.middleware === 'guest' && userStore.token) next({ name: "dashboard" })
  else next()
})

export default router
