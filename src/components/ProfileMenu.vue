<!-- create a profile Menu-->
<template>
    <div class="q-ma-md">
        <q-btn color="purple" label="Account">
            <q-menu>
                <div class="row no-wrap q-pa-md">
                    <div class="column">
                        <div class="text-h6 q-mb-md">Settings</div>
                        <q-toggle v-model="mobileData" label="une option" />
                        <q-toggle v-model="bluetooth" label="une option" />
                    </div>

                    <q-separator vertical inset class="q-mx-lg" />

                    <div class="column items-center">
                        <q-avatar size="72px">
                            <img :src="profileImgUrl" />
                        </q-avatar>

                        <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userDetails.username }}</div>

                        <q-btn
                            color="primary"
                            label="Logout"
                            push
                            size="sm"
                            v-close-popup
                            @click="logout()"
                        />
                    </div>
                </div>
            </q-menu>
        </q-btn>
    </div>
</template>
<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue'
import { useRouter } from 'vue-router';



export default {

    setup() {
        //always declare $router in setup
        const $router = useRouter();

        //get user information from local storage
        const userDetails = ref(JSON.parse(localStorage.getItem('user')))
        console.log(userDetails);
        const logout = () => {
            localStorage.removeItem('user')
            $router.push('/login')
        }
        return {
            mobileData: ref(true),
            bluetooth: ref(false),
            userDetails,
            logout,
        }
    },
    mounted() {
        console.log("mounted")
        //get user information from local storage
        const userDetails = ref(JSON.parse(localStorage.getItem('user')))
        //get user id from local storage
        const userId = ref(JSON.parse(localStorage.getItem('user')).id)
    },
    computed: {
        profileImgUrl() {
            return "http://localhost:30263/content/profileimg/" + this.userDetails.id + ".jpg"
        }
    }
}
</script>