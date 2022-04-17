<template>
    <q-page>
        <div v-if="MesCourse != null">
            <q-list>
                <q-item clickable v-ripple>
                    <q-item-section thumbnail>
                        <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    </q-item-section>
                    <q-item-section>List item</q-item-section>
                </q-item>
            </q-list>
        </div>
        <div v-else>
            <q-list>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>No Courses created by You</q-item-label>
                        <q-item-label caption>no  Courses found</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>


    </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";

var MesCourse = ref(null);
function getMesCourses() {
    //get userId from user object in local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    //get user data from /users/:userId
    api.get("/users/" + userId).then(response => {
        console.log(response.data);
        //if list of courses is empty set MesCourse to null
        if (response.data.courses.length == 0) {
            MesCourse.value = null;
        }
        else {
            MesCourse.value = response.data.courses;
        }
        console.log("MesCourses: ", MesCourse.value);
    });
}
export default defineComponent({
    name: "MesCourse",
    setup() {

        return {
            MesCourse,
        }

    },
    mounted() {
        getMesCourses();
    }
});
</script>