import { ref } from 'vue'
import { error, setError } from '../store/alertMessages.js'

export function handleAPIError(errorResponse) {
    if (errorResponse?.response?.data?.message != undefined) {
        error.value = errorResponse.response.data.message;
    } else {
        error.value = 'Unknown Error';
    }
    console.log(errorResponse);
}
