<!-- profile page modification from  -->
<template>
    <q-page>
        <div class="row">
            <h5 class="q-ma-md">Paramètres de Profile</h5>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" v-model="data.firstName" label="Changer votre nom">
                    <template v-slot:append>
                        <q-btn @click="updateFirstName()" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" v-model="data.lastName" label="Changer votre Prenom">
                    <template v-slot:append>
                        <q-btn @click="updateLastName()" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" v-model="data.email" label="Changer votre Email">
                    <template v-slot:append>
                        <q-btn @click="updateEmail()" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row flex-center q-ma-md">
            <!-- profile image -->
            <div class="col" style="max-width: 50%;">
                <q-file v-model="data.profilePhoto" label="Photo de Profile">
                    <template v-slot:append>
                        <q-btn @click="updateProfileImage" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-file>

            </div>
        </div>

    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from '../boot/axios';
import { useQuasar } from 'quasar'

var data = ref({
    firstName: JSON.parse(localStorage.getItem('user')).firstName,
    lastName: JSON.parse(localStorage.getItem('user')).lastName,
    email: JSON.parse(localStorage.getItem('user')).email,
    profilePhoto: null,
});
export default defineComponent({
    name: "ProfilePage",

    setup() {
        const $q = useQuasar();
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        return {
            data,

            updateFirstName() {
                console.log(data.value.firstName);
                //create a user object with user firstName and lastName and email
                const user = {
                    firstName: data.value.firstName,
                    lastName: JSON.parse(localStorage.getItem('user')).lastName,
                    email: JSON.parse(localStorage.getItem('user')).email,
                }
                //send put request to /users/:userId with user object if status is 200 update localStorage and show success message
                //else show error message
                api.put(`/users/${userId}`, user).then(res => {
                    //localStorage.setItem('user', JSON.stringify(res.data));
                    $q.notify({
                        color: "positive",
                        message: "Votre nom a été changé avec succès",
                        position: "top",
                        timeout: 3000
                    });
                    //update user firstName in localStorage
                    var user = JSON.parse(localStorage.getItem('user'));
                    user.firstName = data.value.firstName;
                    localStorage.setItem('user', JSON.stringify(user));

                }).catch(err => {
                    $q.notify({
                        color: "negative",
                        message: "Une erreur est survenue",
                        position: "top",
                        timeout: 3000
                    });
                })
            },
            updateLastName() {
                console.log(data.value.lastName);
                //create a user object with user firstName and lastName and email
                const user = {
                    firstName: JSON.parse(localStorage.getItem('user')).firstName,
                    lastName: data.value.lastName,
                    email: JSON.parse(localStorage.getItem('user')).email,
                }
                //send put request to /users/:userId with user object if status is 200 update localStorage and show success message
                //else show error message
                api.put(`/users/${userId}`, user).then(res => {
                    //localStorage.setItem('user', JSON.stringify(res.data));
                    $q.notify({
                        color: "positive",
                        message: "Votre Prénom a été changé avec succès",
                        position: "top",
                        timeout: 3000
                    });
                    //update user lastName in localStorage
                    var user = JSON.parse(localStorage.getItem('user'));
                    user.lastName = data.value.lastName;
                    localStorage.setItem('user', JSON.stringify(user));

                }).catch(err => {
                    console.log(err);
                    $q.notify({
                        color: "negative",
                        message: "Une erreur est survenue",
                        position: "top",
                        timeout: 3000
                    });
                })
            },
            updateEmail() {
                console.log(data.value.email);
                //create a user object with user firstName and lastName and email
                const user = {
                    firstName: JSON.parse(localStorage.getItem('user')).firstName,
                    lastName: JSON.parse(localStorage.getItem('user')).lastName,
                    email: data.value.email,
                }
                //send put request to /users/:userId with user object if status is 200 update localStorage and show success message
                //else show error message
                api.put(`/users/${userId}`, user).then(res => {
                    //localStorage.setItem('user', JSON.stringify(res.data));
                    $q.notify({
                        color: "positive",
                        message: "Votre Email a été changé avec succès",
                        position: "top",
                        timeout: 3000
                    });
                    //update user email in localStorage
                    var user = JSON.parse(localStorage.getItem('user'));
                    user.email = data.value.email;
                    localStorage.setItem('user', JSON.stringify(user));
                }).catch(err => {
                    $q.notify({
                        color: "negative",
                        message: "Une erreur est survenue",
                        position: "top",
                        timeout: 3000
                    });
                })
            },
            updateProfileImage() {
                console.log(data.value.profilePhoto);
                //create formData object with user profilePhoto as profilePic
                const formData = new FormData();
                formData.append('profilePic', data.value.profilePhoto);
                //send put request to /users/picture/:userId with formData object if status is 200 update localStorage and show success message
                //else show error message
                api.put(`/users/picture/${userId}`, formData).then(res => {
                    //localStorage.setItem('user', JSON.stringify(res.data));
                    $q.notify({
                        color: "positive",
                        message: "Votre photo de profile a été changé avec succès",
                        position: "top",
                        timeout: 3000
                    });
                    //update user profilePhoto in localStorage
                    var user = JSON.parse(localStorage.getItem('user'));
                    user.profilePhoto = data.value.profilePhoto;
                    console.log(data.value)
                    localStorage.setItem('user', JSON.stringify(user));
                }).catch(err => {
                    $q.notify({
                        color: "negative",
                        message: "Une erreur est survenue",
                        position: "top",
                        timeout: 3000
                    });
                })

            },

        }

    },
    mounted() {
        console.log("app mounted ", data.value.firstName);
    },
    computed() {
        firstName: JSON.parse(localStorage.getItem('user')).firstName;
    }
});
</script>
