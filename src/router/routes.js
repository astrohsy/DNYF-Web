const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/GroupPage.vue") },
      {
        path: "/group-edit",
        component: () => import("pages/GroupEditPage.vue"),
      },
      {
        path: "/groups/:id",
        name: "group-detail",
        component: () => import("pages/GroupDetailPage.vue"),
      },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      { path: "/signup", component: () => import("pages/SignupPage.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
