<template>
    <q-page>
        <div v-if="notification != null">
            <q-list>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>Item with caption</q-item-label>
                        <q-item-label caption>Caption</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <div v-else>
            <q-list>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>No notifications</q-item-label>
                        <q-item-label caption>no notification found</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>


    </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";

const notification = ref(null);
function getNotifications() {
    //get notification from /notifications/:userId
    //get userId from user object in local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    api.get("/notifications/" + userId).then(response => {
        console.log(response.data);
        notification.value = response.data;
        console.log("notifications: ", notification.value);
    });
}
export default defineComponent({
    name: "Notifications",
    setup() {



        return {
            notification
        }
    },
    mounted() {
        console.log("Notifications mounted");
        getNotifications();
    }
});
</script>
