<template>
    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form method="POST" @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" :class="{ 'is-invalid': emailError }" id="email" placeholder="Enter your email" v-model="userEmail" >
                            <div class="invalid-feedback">{{ emailError }}</div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" :class="{ 'is-invalid': emailError }" id="password" placeholder="Enter your password" v-model="userPassword" >
                            <div class="invalid-feedback">{{ passwordError }}</div>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { login } from '../../store/auth'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { handleAPIError } from '../../helpers/helpers'

import { clearAlert } from '../../store/alertMessages.js'

import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const error = ref('')

const router = useRouter()

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const { handleSubmit } = useForm({
    validationSchema: schema,
})

const { value: userEmail, errorMessage: emailError } = useField("email");
const { value: userPassword, errorMessage: passwordError } = useField("password");

const onSubmit = handleSubmit((values) => {
    loginUser()
});

function loginUser() {
    axios.post('/api/login',{
        email: userEmail.value, password: userPassword.value
    })
        .then(function (response) {
            if (response.data.data.token != undefined) {
                login(response.data.data.token)
                clearAlert()
                router.push('/tasks');
            }
        })
        .catch(handleAPIError);
}
</script>
