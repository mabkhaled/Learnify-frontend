<!-- logi template -->
<template>
    <q-card align="center">
        <q-card-section>
            <div class="text-h6 absolute-center">Register Form</div>
        </q-card-section>
        <q-card-section>
            <div class="q-ma-xl" style="width: 500px;">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <!-- q-input username element  -->
                    <q-input filled v-model="data.username" label="Nmm d'utilisateur" hint="type your username"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please type something']" />
                    <!-- q-input element  -->
                    <q-input filled v-model="data.firstName" label="Votre Nom *" hint="type your first name" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']" />
                    <!-- end of q-input element -->
                    <q-input filled v-model="data.lastName" label="Votre Prénom *" hint="type your Last Name" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']" />
                    <q-input filled v-model="data.email" label="Votre Email *" hint="type your Email" lazy-rules
                        :rules="[val => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Please type a valid email']" />
                    <!-- this is the Birth date input -->
                    <q-input filled v-model="data.birthDate" mask="date" :rules="['date']"
                        hint="Votre data de naissance">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="data.birthDate" hint="donner votre mot de pass">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <!-- end of birth date input -->

                    <q-input filled v-model="data.phone" label="Votre numéro de telephone *"
                        hint="type your phone number" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']" />
                    <q-input filled type="Password" v-model="data.password" label="Your Password *" lazy-rules :rules="[
                        val => val !== null && val !== '' && val.length > 8 && val.length < 15 || 'Please type your Password',
                    ]" />

                    <!-- upload profile image -->
                    <q-file color="purple-12" v-model="data.profileImage" label="Profile image" accept=".jpg">
                        <template v-slot:prepend>
                            <q-icon name="attach_file" />
                        </template>
                    </q-file>
                    <!-- end of upload profile image -->

                    <!-- profile type select -->
                    <q-select v-model="data.profileType" label="Profile Type *" :options="data.profileTypeOptions"
                        :rules="[val => val || 'Please select a profile type']"></q-select>

                    <div>
                        <q-btn label="Register" type="submit" color="primary" />
                        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                        <q-btn label="Login Page" to="/login" color="primary" flat class="q-ml-sm float-right" />
                    </div>
                </q-form>
            </div>
        </q-card-section>
    </q-card>
</template>

<!-- create script tag -->
<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
//import api from axios
import { api } from '../boot/axios'
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'Register',
    setup() {
        const $q = useQuasar();
        const $router = useRouter();
        const data = ref({
            username: ref(''),
            firstName: ref(''),
            lastName: ref(''),
            email: ref(''),
            birthDate: ref(null),
            phone: ref(''),
            password: ref(''),
            profileImage: ref(null),
            profileType: ref(null),
            profileTypeOptions: [
                { label: 'etudinat', value: 'ETUDIENT' },
                { label: 'enseignant', value: 'ENSEIGNANT' },
            ],
        })
        const register = () => {
            const formData = new FormData();
            const userData = {
                username: data.value.username,
                name: data.value.firstName,
                lastName: data.value.lastName,
                email: data.value.email,
                birthDate: data.value.birthDate,
                password: data.value.password,
                email: data.value.email,
                phone: data.value.phone,
                roles: [data.value.profileType.value],
            }
            formData.append('firstName', data.value.firstName);
            formData.append('lastName', data.value.lastName);
            formData.append('email', data.value.email);
            formData.append('password', data.value.password);
            formData.append('phone', data.value.phone);

            api.post('/users/register', formData).then(res => {
                // chek for status code
                if (res.status === 201) {
                    $q.notify({
                        color: 'positive',
                        message: 'votre compte a été créé avec succès',
                    })
                    // redirect to login page
                    $router.push('/login')

                } else {
                    console.log("this is the error inside the register function")
                    $q.notify({
                        color: 'negative',
                        message: 'Une erreur est survenue lors de la création de votre compte',
                    })
                }
            }).catch(err => {
                console.log(err)
                console.log("this is the error inside the catch statement")
                $q.notify({
                    color: 'negative',
                    message: 'Une erreur est survenue lors de la création de votre compte',
                })
            })

            //log user data
            console.log(userData)
        }
        return {
            data,
            onReset() {
                data.value = {
                    firstName: ref(''),
                    lastName: ref(''),
                    email: ref(''),
                    birthDate: ref(null),
                    password: ref(''),
                    phone: ref(''),
                    profileImage: ref(null),
                    profileType: ref(null),
                }
            },
            onSubmit() {
                register()
            },
        }
    }
})
</script>
