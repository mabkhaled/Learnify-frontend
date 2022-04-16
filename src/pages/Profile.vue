<!-- profile page modification from  -->
<template>
    <q-page>
        <div class="row">
            <h5 class="q-ma-md">Paramètres de Profile</h5>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" :v-model="data.userNameInput" label="Changer votre nom"
                    :model-value="data.userNameInput">
                    <template v-slot:append>
                        <q-btn @click="changeName" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" :v-model="data.lastNameInput" label="Changer votre Prenom"
                    :model-value="data.lastNameInput">
                    <template v-slot:append>
                        <q-btn @click="changeName" label="Changer" color="primary" flat></q-btn>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row justify-center q-ma-md">

            <div class="col" style="max-width: 50%;">
                <q-input type="text" :v-model="data.emailInput" label="Changer votre Email"
                    :model-value="data.emailInput">
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
    userNameInput: ref(""),
    lastNameInput: ref(""),
    emailInput: ref(""),
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
        data.userNameInput = JSON.parse(localStorage.getItem('user')).firstName;
        data.emailInput = JSON.parse(localStorage.getItem('user')).email;
        console.log(data.userNameInput);
    },
});

function changeName() {
    console.log("change name", data.userNameInput);
}
</script>
