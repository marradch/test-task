<template>
    <h1>Tasks</h1>
    <button class="btn btn-primary" @click="showModal = true">Create new task</button>
    <div class="row row-cols-1 g-3 mt-3 mb-3">
        <div class="col" v-for="(task, index) in tasks" :key="index">
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="mb-0">{{ task.title }}</h5>
                </div>

                <div class="card-body">
                    <p class="card-text mb-0">
                        {{ task.description }}
                    </p>
                </div>

                <div class="card-footer d-flex justify-content-between align-items-center">
                    <div>
                        <router-link
                            class="btn btn-sm btn-primary me-2"
                            :to="{ name: 'task-edit', params: { id: task.id } }"
                        >
                            Edit
                        </router-link>
                        <button
                            class="btn btn-sm btn-danger"
                            @click="deleteTask(task.id)"
                        >
                            Delete
                        </button>
                    </div>
                    <div>
                        <StatusToggle
                            v-model="task.completed"
                            :taskId="task.id"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--<div v-if="pagesCount >= 2">
        <ul class="pagination justify-content-center">
            <li v-for="page in pagesCount" :key="page" class="page-item" :class="{ 'active': page === currentPage }">
                <a class="page-link" @click="loadTasks(page)" href="#">{{ page }}</a>
            </li>
        </ul>
    </div>-->
    <button v-if="hasMore" class="btn btn-primary" @click="loadTasks(currentPage + 1)">Load more</button>
    <Modal v-if="showModal" title="Create task" @close="showModal = false">
        <CreateTaskForm @created="showModal = false"/>
    </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { handleAPIError } from '../../helpers/helpers';
import StatusToggle from '../common/StatusToggle.vue';
import Modal from '../common/Modal.vue';
import CreateTaskForm from '../common/CreateTaskForm.vue';

const tasks = ref([]);
//const pagesCount = ref(0);
const currentPage = ref(1);
const showModal = ref(false)
const hasMore = ref(false);

loadTasks(1)

function loadTasks(page) {
    axios.get(`/api/tasks?page=${page}`)
        .then(function (response) {
            if (response?.data?.data != undefined) {
                tasks.value = [...tasks.value, ...response?.data?.data];
                let pagesCountResponse = response?.data?.meta.total / response?.data?.meta.per_page;
                pagesCountResponse = parseInt(pagesCountResponse);
                if (response?.data?.meta.total - pagesCountResponse * response?.data?.meta.per_page) {
                    pagesCountResponse++;
                }
                hasMore.value = response?.data?.meta.current_page != response?.data?.meta.last_page;
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
