import { authGuard } from "@auth0/auth0-vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "group",
        component: () => import("pages/GroupPage.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "/group-edit",
        component: () => import("pages/GroupEditPage.vue"),
        beforeEnter: authGuard,
      },
      {
        path: "/groups/:id",
        name: "group-detail",
        component: () => import("pages/GroupDetailPage.vue"),
        beforeEnter: authGuard,
      },
    ],
  },
  {
    path: "/blank",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      { path: "/signup", component: () => import("pages/SignupPage.vue") },
    ],
    beforeEnter: authGuard,
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
