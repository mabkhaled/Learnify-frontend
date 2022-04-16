<!-- profile page modification from  -->
<template>
    <q-page>
        <div class="row">
            <h5 class="q-ma-md">Paramètres de Profile</h5>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" :v-model="data.firstName" label="Changer votre nom" :model-value="data.firstName">
                    <template v-slot:append>
                        <q-btn @click="changeName" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" :v-model="data.lastName" label="Changer votre Prenom" :model-value="data.lastName">
                    <template v-slot:append>
                        <q-btn @click="changeName" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" :v-model="data.email" label="Changer votre Email" :model-value="data.email">
                    <template v-slot:append>
                        <q-btn @click="changeName" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row flex-center q-ma-md">
            <!-- profile image -->
            <div class="col" style="max-width: 50%;">
                <q-file v-model="data.profilePhoto" label="Photo de Profile">
                    <template v-slot:append>
                        <q-btn @click="changeName" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-file>

            </div>
        </div>

    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

const data = {
    firstName: ref(""),
    lastName: ref(""),
    email: ref(""),
    profilePhoto: null,
}
export default defineComponent({
    name: "ProfilePage",

    setup() {
        return {
            data,
            changeName

        }

    },
    mounted() {
        data.firstName = JSON.parse(localStorage.getItem('user')).firstName;
        data.lastName = JSON.parse(localStorage.getItem('user')).lastName;
        data.email = JSON.parse(localStorage.getItem('user')).email;
        console.log(data.firstName);
    },
});

function changeName() {
    console.log("change name", data.firstName);
}
</script>
