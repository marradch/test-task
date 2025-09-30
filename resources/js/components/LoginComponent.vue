<template>
    <div v-if="error" class="alert alert-danger mt-2" role="alert">
        {{ error }}
    </div>
    <div v-else class="row justify-content-center mt-2">
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
<script>
import { login } from '../store/auth'

export default {
    data(){
        return {
            userEmail: '',
            userPassword: '',
            error: '',
        }
    },
    methods: {
        loginUser(){
            var component = this;
            axios.post('/api/login',{email: this.userEmail, password: this.userPassword})
                .then(function (response) {
                    if (response.data.data.token != undefined) {
                        login(response.data.data.token)
                        component.$router.push('/tasks');
                    }
                })
                .catch(function (error) {
                    if (error?.response?.data?.message != undefined) {
                        component.error = error.response.data.message;
                    }
                });
        },
    },
}
</script>
