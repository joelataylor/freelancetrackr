import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'

import Home from '@/views/Home'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import Dashboard from '@/views/Dashboard'
import Projects from '@/views/Projects'
import Clients from '@/views/Clients'
import ClientProfile from '@/views/ClientProfile'
import ClientEdit from '@/views/ClientEdit'
import ClientNew from '@/views/ClientNew'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: { requireAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requireBusiness: true }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: { requireBusiness: true }
    },
    {
      path: '/clients/new',
      name: 'clientNew',
      component: ClientNew,
      meta: { requireBusiness: true }
    },
    {
      path: '/clients/:id/edit',
      name: 'clientEdit',
      component: ClientEdit,
      meta: { requireBusiness: true }
    },
    {
      path: '/clients/:id',
      name: 'clientProfile',
      component: ClientProfile,
      meta: { requireBusiness: true }
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients,
      meta: { requireBusiness: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  let business = null
  let user = null

  await auth.getCurrentUser().then(currentUser => {
    user = currentUser
  })

  if (user) {
    await auth.getCurrentBusiness(user).then(biz => {
      business = biz
    })
  }

  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let requireBusiness = to.matched.some(record => record.meta.requireBusiness)

  if (requireAuth && !user) {
    next('signin')
  } else if (requireBusiness && !business) {
    next('signup')
  } else if (
    (to.name === 'signin' || to.name === 'signup') &&
    user &&
    business
  ) {
    next('dashboard')
  } else {
    next()
  }
})

export default router
