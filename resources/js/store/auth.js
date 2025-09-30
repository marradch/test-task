import { ref } from 'vue'

export const isAuthenticated = ref(!!sessionStorage.getItem('sanctum_token'))

export function login(token) {
    sessionStorage.setItem('sanctum_token', token)
    isAuthenticated.value = true
}

export function logout() {
    sessionStorage.removeItem('sanctum_token')
    isAuthenticated.value = false
}
