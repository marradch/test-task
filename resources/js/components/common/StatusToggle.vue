<template>
    <button
        type="button"
        class="btn"
        :class="statusClass"
        @click="toggleStatus"
    >
        <input
            type="checkbox"
            class="form-check-input"
            :checked="completed"
            @change.stop
        />
        <span>{{ statusText }}</span>
    </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { handleAPIError } from "../../helpers/helpers";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    taskId: {
        type: Number,
        required: true
    },
})

const completed = ref(props.modelValue);

const statusClass = computed(() =>
    completed.value ? 'btn-success' : 'btn-secondary'
)

const statusText = computed(() =>
    completed.value ? 'Completed' : 'Not completed'
)

function toggleStatus() {
    completed.value = !completed.value;
    axios.patch(`/api/tasks/set-completion/${props.taskId}`, {
        completed: Number(completed.value)
    })
        .then(function (response) {
        })
        .catch(handleAPIError);
}
</script>

<style scoped>
.btn {
    display: flex;
    gap: 6px;
}

input {
    pointer-events: none; /* чтобы клик шел по кнопке */
}
</style>
