<template>
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
</template>

<script setup>
import { ref } from 'vue'
import { handleAPIError } from '../../helpers/helpers';
import { setInfo } from '../../store/alertMessages';

const title = ref('')
const description = ref('')

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
