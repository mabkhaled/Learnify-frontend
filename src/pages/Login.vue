<!-- logi template -->
<template>
    <q-card class="absolute-center">
        <q-card-section>
            <div class="text-h6 absolute-center q-ma-md">Login Form</div>
        </q-card-section>
        <q-card-section>
            <div class="q-pa-xl" style="width: 500px;">
                <q-form @submit="onSubmit" class="q-gutter-md">
                    <q-input filled v-model="data.useremail" label="Email d'utilisateur *" hint="type your email"
                        lazy-rules :rules="[val => val !== null && val !== '' || 'Please type something']" />

                    <q-input filled type="Password" v-model="data.password" label="Votre mot de passe *" lazy-rules
                        :rules="[
                            val => val !== null && val !== '' || 'Please type your Password',
                        ]" />

                    <div>
                        <q-btn label="Login" type="submit" color="primary" />
                        <q-btn label="Register page" to="/register" color="primary" flat class="q-ml-sm float-right" />
                    </div>
                </q-form>
            </div>
        </q-card-section>
    </q-card>
</template>

<!-- create script tag -->
<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { api } from '../boot/axios'
import { useQuasar } from 'quasar'
import axios from 'axios';

export default defineComponent({
    name: 'Login',
    setup() {
        const $q = useQuasar();
        const $router = useRouter();
        const data = ref({
            useremail: ref(''),
            password: ref(''),
        })
        const login = () => {
            // send login request
            // if success, redirect to home page
            // if fail, show error message
            const userData = {
                email: data.value.useremail,
                password: data.value.password,
            }
            //log userData
            console.log(userData)
            api.post('/users/login', userData).then(res => {
                console.log(res)
                //if http status is 200 show success message
                if (res.status === 200) {
                    //api.defaults.headers.common['Authorization'] = res.data.token
                    $q.notify({
                        color: 'positive',
                        textColor: 'white',
                        message: 'Bienvenue ' + res.data.firstName +" "+ res.data.lastName,
                    })
                    //save user data in local storage
                    localStorage.setItem('user', JSON.stringify(res.data))
                    console.log("store user data in local storage :" + localStorage.getItem('user'))

                    //redirect to home page
                    $router.push('/dashboard')
                }
                else {
                    $q.notify({
                        color: 'negative',
                        textColor: 'white',
                        message: 'Invalid useremail or password',
                    })
                }
            }).catch(err => {
                console.log(err)
                $q.notify({
                    color: 'negative',
                    textColor: 'white',
                    message: 'erreur de connexion',
                })
            })

        }
        return {
            data,
            onSubmit() {
                login()
            },
        }
    },

})

</script>
