import { ref } from 'vue'

export const alertText = ref('')
export const alertType = ref('')

export function setError(errorValue) {
    alertText.value = errorValue
    alertType.value = 'danger'
}

export function setInfo(text) {
    alertText.value = text
    alertType.value = 'success'

    setTimeout(() => {
        alertText.value = ''
        alertType.value = ''
    }, 2000)
}

export function clearAlert()
{
    alertText.value = ''
    alertType.value = ''
}
