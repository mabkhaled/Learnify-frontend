<template>
    <q-form>
        <q-input label="Lesson Description" v-model="data.description"></q-input>
        <q-file label="Lesson Image" v-model="data.image"></q-file>

        <!-- add submit and cancel buttons -->
        <q-btn @click="submit" label="Submit" color="primary" class="q-ma-md" />
        <q-btn @click="cancel" label="Cancel" color="primary" class="q-ma-md" />

    </q-form>

</template>

<script>
import { defineComponent, ref } from "vue";
//import api from axios
import { api } from "src/boot/axios";


export default defineComponent({
    name: "AddLesson",
    setup() {
        var data = ref({
            description: "",
            image: ""
        });
        function addLesson(courseId) {
            //submit data to /course/lessons/new/:courseId
            api.post("/course/lessons/new/" + courseId, data.value).then(response => {
                console.log(response.data);
            });


        }
        return {
            data,
            methods: {
                addLesson
            }
        }
    }
});
</script>