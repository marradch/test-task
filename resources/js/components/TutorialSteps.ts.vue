<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-body">
                <h4 class="card-title mb-3">{{ currentStepData.title }}</h4>

                <!-- Индикатор шагов с кружком -->
                <ul class="list-unstyled d-flex justify-content-between mb-4">
                    <li v-for="(step, index) in steps" :key="index" class="d-flex align-items-center" @click="currentStep = index">
                        <!-- Круг с номером -->
                        <div
                            class="d-flex justify-content-center align-items-center rounded-circle border fw-bold"
                            :class="{
                                'bg-primary text-white border-primary': index === currentStep,
                                'bg-light text-muted': index > currentStep,
                                'bg-primary text-muted': index < currentStep
                              }"
                            style="width: 40px; height: 40px;"
                        >
                            {{ index + 1 }}
                        </div>
                        <!-- Текст шага -->
                        <span class="ms-2">{{ step.title }}</span>
                    </li>
                </ul>

                <!-- Текущая информация о шаге -->
                <div>
                    <p class="card-text">{{ currentStepData.description }}</p>
                </div>

                <!-- Кнопки -->
                <div class="d-flex justify-content-between mt-3">
                    <button
                        class="btn btn-secondary"
                        @click="prevStep"
                        :disabled="currentStep === 0"
                    >
                        Назад
                    </button>

                    <button
                        v-if="currentStep < steps.length - 1"
                        class="btn btn-primary"
                        @click="nextStep"
                    >
                        Дальше
                    </button>

                    <button v-else class="btn btn-success" @click="currentStep = 0">
                        Заново
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

interface Step {
    title: string;
    description: string;
}

const steps = ref<Step[]>([
    { title: "Основы", description: "Базовые знания Vue.js" },
    { title: "Компоненты", description: "Как работать с компонентами" },
    { title: "Роутер", description: "Навигация между страницами" },
    { title: "Vuex", description: "Управление состоянием" },
    { title: "Composition API", description: "Новый способ писать код" },
]);

const currentStep = ref<number>(0);

const currentStepData = computed<Step>(() => steps.value[currentStep.value]);

function nextStep(): void {
    if (currentStep.value < steps.value.length - 1) currentStep.value++;
}

function prevStep(): void {
    if (currentStep.value > 0) currentStep.value--;
}
</script>
