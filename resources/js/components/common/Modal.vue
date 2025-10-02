<template>
    <div class="modal fade show" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' }
})

const emit = defineEmits(['close'])

function close() {
    emit('close')
}
</script>

<style scoped>
.modal {
    background: rgba(0,0,0);
    z-index: 1050;
}
</style>
