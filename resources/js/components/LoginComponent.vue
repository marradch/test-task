<template>
    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Login</div>
                <div class="card-body">
                    <form method="POST" @submit.prevent="loginUser">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="text" class="form-control" id="email" placeholder="Enter your email" required="required" v-model="userEmail" >
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter your password" required="required" v-model="userPassword" >
                        </div>
                        <button type="submit" class="btn btn-primary mt-2">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { login } from '../store/auth'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { handleAPIError } from '../helpers/helpers';

const userEmail = ref('')
const userPassword = ref('')
const error = ref('')

const router = useRouter()

function loginUser(){
    axios.post('/api/login',{
        email: userEmail.value, password: userPassword.value
    })
        .then(function (response) {
            if (response.data.data.token != undefined) {
                login(response.data.data.token)
                router.push('/tasks');
            }
        })
        .catch(handleAPIError);
}
</script>
