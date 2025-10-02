import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import LoginComponent from "./components/pages/LoginPage.vue";
import TasksComponent from "./components/pages/TasksPage.vue";
import CreateTaskComponent from "./components/pages/CreateTaskPage.vue";
import EditTaskComponent from "./components/pages/EditTaskPage.vue";
const NotFoundPage = () => import(/* webpackChunkName: "not-found" */ './components/pages/NotFoundPage.vue')
const TutorialSteps = () => import(/* webpackChunkName: "tasks-page" */ './components/pages/TutorialSteps.ts.vue')
import { isAuthenticated } from './store/auth'

const routes = [
    {
        path: '/login',
        component: LoginComponent,
    },
    {
        path: '/',
        component: TasksComponent,
    },
    {
        path: '/tasks',
        component: TasksComponent,
    },
    {
        path: '/task-edit/:id',
        name: 'task-edit',
        component: EditTaskComponent,
    },
    {
        path: '/create-task',
        component: CreateTaskComponent,
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
