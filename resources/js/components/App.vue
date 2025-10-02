<template>
    <div>
        <Header />

        <div v-if="error" class="alert alert-danger mt-2" role="alert">
            {{ error }}
        </div>

        <main class="container">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './common/HeaderComponent.vue'
import { error } from '../store/alertMessages.js'
</script>
