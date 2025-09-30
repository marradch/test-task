<template>
    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <router-link class="btn btn-primary mt-2" to="/tasks">Back</router-link>
        </div>
    </div>
    <div v-if="error" class="alert alert-danger mt-2" role="alert">
        {{ error }}
    </div>

    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Editing of task</div>
                <div class="card-body">
                    <form method="POST" @submit.prevent="editTask">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" required="required" class="form-control" id="title" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea required="required" class="form-control" id="description" v-model="description"/>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const title = ref('')
const description = ref('')
const error = ref('')

const router = useRouter()
const route = useRoute()

axios.get(`/api/tasks/${route.params.id}`)
    .then(function (response) {
        if (response?.data?.data != undefined) {
            title.value = response?.data?.data?.title;
            description.value = response?.data?.data?.description;
        }
    })
    .catch((errorResponse) => {
        if (errorResponse?.response?.status === 404) {
            router.push({ name: 'not-found' });
        } else if (errorResponse?.response?.data?.message != undefined) {
            error.value = errorResponse.response.data.message;
        }
    });

function editTask(){
    axios.put(`/api/tasks/${route.params.id}`,{
        title: title.value,
        description: description.value
    })
        .then(function (response) {
            if (response.data.data != undefined) {
                router.push('/tasks');
            }
        })
        .catch(function (errorResponse) {
            if (errorResponse?.response?.data?.message != undefined) {
                error.value = errorResponse.response.data.message;
            }
        });
}
</script>

<style scoped>

</style>

