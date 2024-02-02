import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes = [
  //la ruta base
  {
    path: "/",
    redirect: "/inicio",
  },
  //rutas asociadas a los componentes
  {
    path: "/",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    //los componentes que se renderizan en router vue
    children: [
      {
        path: "/inicio",
        name: "inicio",
        component: () => import("../components/Inicio.vue"),
      },
      {
        path: "/formulario",
        name: "formulario",
        component: () => import("../components/Formulario.vue"),
      },
      {
        path: "/paginacion",
        name: "paginacion",
        component: () => import("../components/Paginacion.vue"),
      },
    ],
  },
];

const router = new VueRouter({ routes });
export default router;
