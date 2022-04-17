const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
    meta: {
      requiresAuth: true,
    },

  },
  {
    path: "/profile",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-cours",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/AddCourse.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "course",
    path: "/course/:id",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/VueCourse.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Register.vue") }],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];



export default routes;
