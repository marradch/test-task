<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
            <router-link class="navbar-brand fw-bold" to="/">
                📝 TaskApp
            </router-link>

            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <template v-if="isAuthenticated">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/create-task">Create task</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/tasks">List of tasks</router-link>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-link nav-link" @click="logoutUser">Logout</button>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isAuthenticated, logout } from '../../store/auth'

const router = useRouter()

function logoutUser() {
    logout()
    router.replace({ path: '/', query: { t: Date.now() } })
}
</script>

<style scoped>
.navbar-brand {
    font-size: 1.25rem;
}
</style>
