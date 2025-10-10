import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import LoginPage from "./components/pages/LoginPage.vue";
import TasksPage from "./components/pages/TasksPage.vue";
import TasksPageUsual from "./components/pages/TasksPageUsual.vue";
import CreateTaskPage from "./components/pages/CreateTaskPage.vue";
import EditTaskPage from "./components/pages/EditTaskPage.vue";
const NotFoundPage = () => import(/* webpackChunkName: "not-found" */ './components/pages/NotFoundPage.vue')
const TutorialSteps = () => import(/* webpackChunkName: "tasks-page" */ './components/pages/TutorialSteps.ts.vue')
import { isAuthenticated } from './store/auth'
import { clearAlert } from './store/alertMessages.js'

const routes = [
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/',
        component: TasksPage,
    },
    {
        path: '/tasks',
        component: TasksPage,
    },
    {
        path: '/tasks-usual',
        component: TasksPageUsual,
    },
    {
        path: '/task-edit/:id',
        name: 'task-edit',
        component: EditTaskPage,
    },
    {
        path: '/create-task',
        component: CreateTaskPage,
    },
    {
        path: '/tutorial',
        component: TutorialSteps,
    },
    {
        path: '/not-found',
        name: 'not-found',
        component: NotFoundPage
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    clearAlert()
    if (to.path !== '/login') {
        if (isAuthenticated.value) {
            next()
        } else {
            next('/login')
        }
    } else {
        if (isAuthenticated.value) {
            next('/tasks')
        } else {
            next()
        }
    }
})


export default router;
