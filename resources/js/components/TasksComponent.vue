<template>
    <h1>Tasks</h1>
    <router-link class="btn btn-primary" to="/create-task">Create new task</router-link>
    <table class="table">
        <thead>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>
                <StatusToggle
                    v-model="task.completed"
                    :taskId="task.id"
                />
            </td>
            <td>
                <router-link class="btn btn-primary me-2"  :to="{ name: 'task-edit', params: { id: task.id } }">
                    Edit
                </router-link>
                <button class="btn btn-danger" @click="deleteTask(task.id)">Delete</button>
            </td>
        </tr>
        </tbody>
    </table>

    <div v-if="pagesCount >= 2">
        <ul class="pagination justify-content-center">
            <li v-for="page in pagesCount" :key="page" class="page-item" :class="{ 'active': page === currentPage }">
                <a class="page-link" @click="loadTasks(page)" href="#">{{ page }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { handleAPIError } from '../helpers/helpers';
import StatusToggle from './common/StatusToggle.vue';

const tasks = ref([]);
const pagesCount = ref(0);
const currentPage = ref(1);

loadTasks(1)

function loadTasks(page) {
    axios.get(`/api/tasks?page=${page}`)
        .then(function (response) {
            if (response?.data?.data != undefined) {
                tasks.value = response?.data?.data;
                let pagesCountResponse = response?.data?.meta.total / response?.data?.meta.per_page;
                pagesCountResponse = parseInt(pagesCountResponse);
                if (response?.data?.meta.total - pagesCountResponse * response?.data?.meta.per_page) {
                    pagesCountResponse++;
                }
                pagesCount.value = pagesCountResponse;
                currentPage.value = response?.data?.meta.current_page;
            }
        })
        .catch(handleAPIError);
}

function deleteTask(id) {
    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    axios.delete(`/api/tasks/${id}`)
        .then(function (response) {
            if (response?.data?.success) {
                loadTasks(1);
            }
        })
        .catch(handleAPIError);
}
</script>
