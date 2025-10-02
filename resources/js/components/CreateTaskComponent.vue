<template>
    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Creation of new task</div>
                <div class="card-body">
                    <form method="POST" @submit.prevent="createTask">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" required="required"  class="form-control" id="title" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea required="required"  class="form-control" id="description" v-model="description"/>
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
import { useRouter } from 'vue-router'
import { handleAPIError } from '../helpers/helpers';

const title = ref('')
const description = ref('')

const router = useRouter()

function createTask(){
    axios.post('/api/tasks',{
        title: title.value,
        description: description.value
    })
        .then(function (response) {
            if (response.data.data != undefined) {
                router.push('/tasks')
            }
        })
        .catch(handleAPIError)
}
</script>

<style scoped>

</style>
