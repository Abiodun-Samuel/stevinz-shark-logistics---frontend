import { useAuthStore } from '@/stores/auth.js'

const DashboardLayout = () => import('@/layouts/DashboardLayout.vue')
const GuestLayout = () => import('@/layouts/GuestLayout.vue')

const Home = () => import('@/pages/HomePage.vue')
const Register = () => import('@/pages/auth/RegisterPage.vue')
const Login = () => import('@/pages/auth/LoginPage.vue')
const Dashboard = () => import('@/pages/dashboard/home/index.vue')
const DashboardCreate = () => import('@/pages/dashboard/home/create.vue')
const DashboardEdit = () => import('@/pages/dashboard/home/edit.vue')
const Profile = () => import('@/pages/dashboard/profile.vue')
const Shipment = () => import('@/pages/dashboard/shipment.vue')
const Admin = () => import('@/pages/dashboard/admin.vue')
const AccessDenied = () => import('@/pages/AccessDenied.vue')
const Error404 = () => import('@/pages/404.vue')

function superAdminAccess(to, from, next) {
  const auth = useAuthStore()
  if (auth?.isSuperAdmin) {
    next()
  } else {
    next('/access-denied')
  }
}

function requireLogin(to, from, next) {
  const auth = useAuthStore()
  if (auth?.isLoggedIn) {
    next()
  } else {
    next({ path: '/login' })
  }
}

function guest(to, from, next) {
  const auth = useAuthStore()
  if (auth?.isLoggedIn) {
    next({ name: 'dashboard.index' })
  } else {
    next()
  }
}

export default [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
        beforeEnter: guest,
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        beforeEnter: guest,
      },
      {
        path: '/access-denied',
        name: 'access_denied',
        component: AccessDenied,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: Error404,
      },
    ],
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    beforeEnter: requireLogin,
    children: [
      {
        name: 'dashboard.index',
        path: 'home',
        component: Dashboard,
        meta: { breadCrumb: 'Dashboard' },
      },
      {
        name: 'dashboard.create',
        path: 'home/create',
        component: DashboardCreate,
        meta: { breadCrumb: 'Dashboard' },
      },
      {
        name: 'dashboard.edit',
        path: 'home/edit/:id',
        component: DashboardEdit,
        meta: { breadCrumb: 'Dashboard' },
      },
      {
        name: 'profile.index',
        path: 'profile',
        component: Profile,
        meta: { breadCrumb: 'Profile' },
      },
      {
        name: 'shipment.index',
        path: 'shipment',
        component: Shipment,
        meta: { breadCrumb: 'Shipment' },
      },
      {
        name: 'admin.index',
        path: 'admin',
        component: Admin,
        beforeEnter: superAdminAccess,
        meta: { breadCrumb: 'Admin' },
      },
    ],
  },
]
