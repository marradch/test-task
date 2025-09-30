<template>
    <div v-if="error" class="alert alert-danger mt-2" role="alert">
        {{ error }}
    </div>

    <div class="row justify-content-center mt-2">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Creation of new task</div>
                <div class="card-body">
                    <form method="POST" @submit.prevent="createTask">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" required="required"  class="form-control" id="title" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea required="required"  class="form-control" id="description" v-model="description"/>
                        </div>
                        <button type="submit" class="btn btn-primary mt-2">Send</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            title: '',
            description: '',
            error: ''
        }
    },
    methods: {
        createTask(){
            var component = this;
            var token = sessionStorage.getItem('sanctum_token');
            axios.post('/api/tasks',{title: this.title, description: this.description}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    if (response.data.data != undefined) {
                        component.$router.push('/tasks');
                    }
                })
                .catch(function (error) {
                    if (error?.response?.data?.message != undefined) {
                        component.error = error.response.data.message;
                    }
                });
        }
    }
}
</script>

<style scoped>

</style>
