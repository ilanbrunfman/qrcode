import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'Home Page'
            },
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/pages/PageNotFound.vue"),
            meta: {
              title: 'Page not found'
            }
        },
    ],
})

//Dynamically Change Page Title
router.beforeEach((to) => {
    document.title = to.meta?.title ?? 'Default Title'
  })

export default router