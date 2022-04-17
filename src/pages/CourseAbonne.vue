<template>
    <q-page>
        <div v-if="SubedCourse != null">
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
                        <q-item-label>No Subed Courses</q-item-label>
                        <q-item-label caption>no Subed Courses found</q-item-label>
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

var SubedCourse = ref(null);
function getSubedCourses() {
    //get userId from user object in local storage
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    //get user data from /users/:userId
    api.get("/users/" + userId).then(response => {
        console.log(response.data);
        //if list of courses is empty set SubedCourse to null
        if (response.data.courses.length == 0) {
            SubedCourse.value = null;
        }
        else {
            SubedCourse.value = response.data.courses;
        }
        console.log("SubedCourses: ", SubedCourse.value);
    });
}
export default defineComponent({
    name: "CourseAbonne",
    setup() {

        return {
            SubedCourse,
        }

    },
    mounted() {
        getSubedCourses();
    }
});
</script>