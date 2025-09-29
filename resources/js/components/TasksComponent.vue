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
                <input @change="setTaskCompletion(task.id, $event)" type="checkbox" v-model="task.completed" :id="'task_' + index" />
                <label :for="'task_' + index">{{ task.completed ? 'Yes' : 'No' }}</label>
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

<script>
export default {
    data(){
        return {
            tasks: [],
            pagesCount: 0,
            currentPage: 1,
        }
    },
    methods: {
        loadTasks(page) {
            var component = this;
            var token = sessionStorage.getItem('sanctum_token');
            axios.get(`/api/tasks?page=${page}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    if (response?.data?.data != undefined) {
                        component.tasks = response?.data?.data;
                        let pagesCount = response?.data?.meta.total / response?.data?.meta.per_page;
                        pagesCount = parseInt(pagesCount);
                        if (response?.data?.meta.total - pagesCount * response?.data?.meta.per_page) {
                            pagesCount++;
                        }
                        component.pagesCount = pagesCount;
                        component.currentPage = response?.data?.meta.current_page;
                    }
                })
                .catch(function (error) {
                    if (error?.response?.data?.message != undefined) {
                        component.error = error.response.data.message;
                    }
                    console.log(error);
                });
        },
        deleteTask(id) {
            const confirmed = window.confirm("Are you sure you want to delete this task?");

            if (!confirmed) {
                return;
            }
            var component = this;
            axios.delete(`/api/tasks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('sanctum_token')}`
                }
            })
                .then(function (response) {
                    if (response?.data?.success) {
                        component.loadTasks(1);
                    }
                })
                .catch(function (error) {
                    if (error?.response?.data?.message != undefined) {
                        component.error = error.response.data.message;
                    }
                    console.log(error);
                });
        },
        setTaskCompletion(taskId, event) {
            const isChecked = event.target.checked ? 1 : 0;
            axios.patch(`/api/tasks/set-completion/${taskId}`, {completed: isChecked}, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('sanctum_token')}`
                }
            })
                .then(function (response) {
                })
                .catch(function (error) {
                    if (error?.response?.data?.message != undefined) {
                        component.error = error.response.data.message;
                    }
                    console.log(error);
                });
        }
    },
    mounted() {
        this.loadTasks(1);
    }
}
</script>

<style scoped>

</style>
