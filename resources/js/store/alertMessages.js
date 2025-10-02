import { ref } from 'vue'

export const error = ref('')

export function setError(errorValue) {
    error.value = errorValue
}
