import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { useAuthStore } from "src/stores/auth";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (store /* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  const userStore = useAuthStore();

  Router.beforeEach((to, from, next) => {
    console.log("=========");
    console.log(to, from, userStore.isLogined);
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !userStore.isLogined()
    ) {
      console.log(111111111, userStore.isLogined);
      console.log();
      next({ path: "/login", query: { next: to.fullPath } });
    } else if (to.path === "/login" && userStore.isLogined()) {
      console.log(2222);
      next({ path: "/login", query: { next: to.fullPath } });
      next({ path: "/" });
    } else {
      console.log(3333, userStore.isLogined());
      next();
    }
  });

  return Router;
});
