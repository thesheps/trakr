import Vue from "vue";
import Router from "vue-router";
import Session from "./views/Session.vue";
import Sessions from "./views/Sessions.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/session/:id",
      name: "session",
      component: Session,
      props: true
    },
    {
      path: "/",
      name: "sessions",
      component: Sessions
    }
  ]
});
