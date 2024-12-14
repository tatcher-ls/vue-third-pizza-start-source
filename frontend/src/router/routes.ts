export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: { layout: "AppLayoutSimple" },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserView.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/orders",
        name: "orders",
        component: () => import("../views/OrdersView.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("../views/ProfileView.vue"),
      },
    ],
  },
];
