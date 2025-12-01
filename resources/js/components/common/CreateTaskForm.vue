<template>
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
        <button type="submit" class="btn btn-primary mt-2">Send</button>
    </form>
</template>

<script setup>
import { handleAPIError } from '../../helpers/helpers';
import { setInfo } from '../../store/alertMessages';

import { useTaskForm } from '../../composables/useTaskForm';

const {
    title,
    description,
    titleError,
    descriptionError,
    handleSubmit
} = useTaskForm();

const onSubmit = handleSubmit((values) => {
    createTask()
});

const emit = defineEmits(['created'])

function close() {
    emit('created')
}

function createTask(){
    axios.post('/api/tasks',{
        title: title.value,
        description: description.value
    })
        .then(function (response) {
            if (response.data.data != undefined) {
                setInfo('Task successfully created')
                emit('created')
            }
        })
        .catch(handleAPIError)
}
</script>
