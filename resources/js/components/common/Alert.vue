<template>
    <div v-if="alertText" class="alert mt-2 alert-dismissible" :class="alertClass" role="alert">
        {{ alertText }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>

<script setup>
import { alertText, alertType } from '../../store/alertMessages.js'
import { computed } from 'vue'

const alertClass = computed(() =>
    'alert-' + alertType.value
)

console.log(alertClass);

</script>
