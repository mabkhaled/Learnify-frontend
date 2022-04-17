const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Home.vue") }],
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
    path: "/notifications",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/Notifications.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/courseabonne",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/CourseAbonne.vue") }],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/mescourse",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/MesCourse.vue") }],
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
    name: "VueMeetPage",
    path: "/VueMeetPage/:lessonId",
    component: () => import("layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("pages/VueMeetPage.vue") }],
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
