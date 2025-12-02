<template>
    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <router-link class="btn btn-primary mt-2" to="/tasks">Back</router-link>
        </div>
    </div>

    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Editing of task</div>
                <div class="card-body">
                    <form method="POST" @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input :class="{ 'is-invalid': titleError }" type="text" class="form-control" id="title" v-model="title">
                            <div class="invalid-feedback">{{ titleError }}</div>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea :class="{ 'is-invalid': descriptionError }" class="form-control" id="description" v-model="description"/>
                            <div class="invalid-feedback">{{ descriptionError }}</div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2" :disabled="isSubmitting">
                            <span v-if="isSubmitting">Sending...</span>
                            <span v-else>Send</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { handleAPIError } from '../../helpers/helpers';
import { setInfo } from '../../store/alertMessages';
import { useTaskForm } from '../../composables/useTaskForm';

const {
    title,
    description,
    titleError,
    descriptionError,
    handleSubmit,
    isSubmitting
} = useTaskForm();

const onSubmit = handleSubmit(async (values) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    await editTask();
});

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
        }

        handleAPIError()
    });

async function editTask(){
    axios.put(`/api/tasks/${route.params.id}`,{
        title: title.value,
        description: description.value
    })
        .then(function (response) {
            if (response.data.data != undefined) {
                router.push('/tasks');
                setInfo('Task successfully updated');
            }
        })
        .catch(handleAPIError);
}
</script>

<style scoped>

</style>

