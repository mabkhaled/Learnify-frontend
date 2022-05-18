<template>
    <q-page>
        <div v-if="notifications.length != 0">
            <q-list>
                <q-item clickable v-ripple v-for="notification in notifications" :key="notification._id">
                    <q-item-section>
                        <q-item-label>{{ notification.body }}</q-item-label>
                        <q-item-label caption>{{ notification.date }}</q-item-label>
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

const notifications = ref([]);
function getNotifications() {
    //get notification from /notifications/:userId
    //get userId from user object in local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    api.get("/users/notifications/" + userId).then(response => {
        console.log(response.data);
        notifications.value = response.data;
    });
}
export default defineComponent({
    name: "Notifications",
    setup() {
        return {
            notifications
        }
    },
    mounted() {
        console.log("Notifications mounted");
        getNotifications();
    }
});
</script>
