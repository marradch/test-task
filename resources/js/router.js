import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import LoginComponent from "./components/LoginComponent.vue";
import TasksComponent from "./components/TasksComponent.vue";
import CreateTaskComponent from "./components/CreateTaskComponent.vue";
import EditTaskComponent from "./components/EditTaskComponent.vue";
import TutorialSteps from "./components/TutorialSteps.ts.vue";
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
