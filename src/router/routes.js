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
      { path: "/user", component: () => import("pages/LoginPage.vue") },
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
