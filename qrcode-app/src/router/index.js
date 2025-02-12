import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'QR Code'
            },
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("@/pages/404/PageNotFound.vue"),
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