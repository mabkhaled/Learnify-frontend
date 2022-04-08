<!-- create a profile Menu-->
<template>
    <div class="q-ma-md">
        <q-btn color="purple" label="Account">
            <q-menu>
                <div class="row no-wrap q-pa-md">
                    <div class="column">
                        <div class="text-h6 q-mb-md">Settings</div>
                        <q-toggle v-model="mobileData" label="Use Mobile Data" />
                        <q-toggle v-model="bluetooth" label="Bluetooth" />
                    </div>

                    <q-separator vertical inset class="q-mx-lg" />

                    <div class="column items-center">
                        <q-avatar size="72px">
                            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                        </q-avatar>

                        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userDetails.username }}</div>

                        <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
                    </div>
                </div>
            </q-menu>
        </q-btn>
    </div>
</template>
<script>
import { ref } from 'vue'



export default {

    setup() {
        //get user information from local storage
        const userDetails = ref(JSON.parse(localStorage.getItem('user')))
        console.log(userDetails);
        return {
            mobileData: ref(true),
            bluetooth: ref(false),
            userDetails
        }
    }
}
</script>