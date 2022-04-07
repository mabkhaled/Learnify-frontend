<!-- logi template -->
<template>
    <q-card class="absolute-center">
        <q-card-section>
            <div class="text-h6 absolute-center q-ma-md">Login Form</div>
        </q-card-section>
        <q-card-section>
            <div class="q-pa-xl" style="width: 500px;">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <q-input
                        filled
                        v-model="email"
                        label="Your Email *"
                        hint="type your Email"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                    />

                    <q-input
                        filled
                        type="Password"
                        v-model="age"
                        label="Your Password *"
                        lazy-rules
                        :rules="[
                            val => val !== null && val !== '' || 'Please type your Password',
                        ]"
                    />

                    <div>
                        <q-btn label="Login" type="submit" color="primary" />
                        <q-btn
                            label="Register page Page"
                            to="/register"
                            color="primary"
                            flat
                            class="q-ml-sm float-right"
                        />
                    </div>
                </q-form>
            </div>
        </q-card-section>
    </q-card>
</template>

<!-- create script tag -->
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'Login',
    setup() {
        const email = ref('')
        const password = ref('')
        const login = () => {
            // do something
        }
        return {
            email,
            password,
            login,
        }
    }
})
</script>
