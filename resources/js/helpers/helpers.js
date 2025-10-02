import { setError } from '../store/alertMessages.js'

export function handleAPIError(errorResponse) {
    let errorText = '';
    if (errorResponse?.response?.data?.message != undefined) {
        errorText = errorResponse.response.data.message;
    } else {
        errorText = 'Unknown Error';
    }
    setError(errorText)
    console.log(errorResponse);
}
