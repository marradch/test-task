<template>
    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Creation of new task</div>
                <div class="card-body">
                    <CreateTaskForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CreateTaskForm from './common/CreateTaskForm.vue';
</script>

<style scoped>

</style>
