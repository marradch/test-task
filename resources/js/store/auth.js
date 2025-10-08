import { ref } from 'vue'

const TOKEN_KEY = '';

export const isAuthenticated = ref(!!sessionStorage.getItem(TOKEN_KEY))

export function login(token) {
    sessionStorage.setItem(TOKEN_KEY, token)
    isAuthenticated.value = true
}

export function logout() {
    sessionStorage.removeItem(TOKEN_KEY)
    isAuthenticated.value = false
}
