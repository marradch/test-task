<template>
    <div>
        <Header />
        <Alert />

        <main class="container">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Header from './common/HeaderComponent.vue'
import Alert from './common/Alert.vue'
</script>
