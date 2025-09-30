<template>
    <div>
        <Header />

        <main class="container">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './common/HeaderComponent.vue'
</script>
