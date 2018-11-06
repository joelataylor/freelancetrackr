import Vue from "vue";
import Router from "vue-router";
import auth from "@/auth";

import Home from "@/views/Home";
import Auth from "@/views/Auth";
import Dashboard from "@/views/Dashboard";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requireAuth: true }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = auth.user();
  let requireAuth = to.matched.some(record => record.meta.requireAuth);

  if (requireAuth && !currentUser) {
    next("auth");
  } else if (to.name === "auth" && currentUser) {
    next("dashboard");
  } else {
    next();
  }
});

export default router;
