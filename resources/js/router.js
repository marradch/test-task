import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import LoginComponent from "./components/LoginComponent.vue";
import TasksComponent from "./components/TasksComponent.vue";
import CreateTaskComponent from "./components/CreateTaskComponent.vue";
import EditTaskComponent from "./components/EditTaskComponent.vue";
import TutorialSteps from "./components/TutorialSteps.ts.vue";

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

const router = createRouter({routes, history: createWebHashHistory()});

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('sanctum_token')

    if (to.path !== '/login') {
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        if (token) {
            next('/tasks')
        } else {
            next()
        }
    }
})


export default router;
