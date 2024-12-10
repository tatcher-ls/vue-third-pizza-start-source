export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: { layout: "AppLayoutSimple" },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/UserView.vue"),
    meta: { layout: "AppLayoutDefault" },
    children: [
      {
        path: "/orders",
        name: "Orders",
        component: () => import("../views/OrdersView.vue"),
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/ProfileView.vue"),
      },
    ],
  },
];
