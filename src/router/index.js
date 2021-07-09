import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import Auth from "../views/Auth.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next();
    }catch (error) {
      next({path: "/"})
    }
  }
  next();
}) 

export default router
