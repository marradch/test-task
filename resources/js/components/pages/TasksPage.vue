<template>
    <h1>Tasks</h1>
    <div class="row my-4">
        <div class="col-6">
            <input @change="applySearch()" type="text" class="form-control" v-model="searchString" placeholder="Search...">
        </div>
        <div class="col-6 text-end">
            <button class="btn btn-primary" @click="showModal = true">Create new task</button>
        </div>
    </div>
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

    <button v-if="hasMore" class="btn btn-primary" @click="loadTasks(currentPage + 1, searchString)">Load more</button>
    <teleport to="body">
        <Modal v-if="showModal" title="Create task" @close="showModal = false">
            <CreateTaskForm @created="showModal = false"/>
        </Modal>
    </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { handleAPIError } from '../../helpers/helpers';
import StatusToggle from '../common/StatusToggle.vue';
import Modal from '../common/Modal.vue';
import CreateTaskForm from '../common/CreateTaskForm.vue';
const searchString = ref('');

const tasks = ref([]);
//const pagesCount = ref(0);
const currentPage = ref(1);
const showModal = ref(false)
const hasMore = ref(false);

loadTasks(1)

function applySearch() {
    tasks.value = [];
    loadTasks(1, searchString.value)
}

function loadTasks(page, q) {
    let url = `/api/tasks?page=${page}`;
    if (q != undefined) {
        url += `&q=${q}`;
    }
    axios.get(url)
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
                const index = tasks.value.findIndex(task => task.id === id);
                if (index !== -1) {
                    tasks.value.splice(index, 1);
                }
            }
        })
        .catch(handleAPIError);
}
</script>
