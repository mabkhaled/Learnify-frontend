<template>
    <q-page class="q-ma-md ">
        <q-card class="">
            <q-card-section>
                <div v-if="!file">
                    Loading ...
                </div>
                <embed  v-else width="100%" height="900" :src= "'http://localhost:3000/'+file">
            </q-card-section>
        </q-card>
    </q-page>

</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { api } from "../boot/axios";
import { useRoute, useRouter } from "vue-router";
//get route params
import { route } from "vue-router";
import { useQuasar } from "quasar";

const file = ref(null);
export default defineComponent({
    name: "pdf",
   setup(){
            let course;
            const courseId = useRoute().params.courseId;
            const lessonId = useRoute().params.lessonId;
            api.get("/courses/" + courseId).then(response => {
                console.log(response.data);
                course = response.data;

                const lesson = course.lessons.find(el => el._id == lessonId);

                file.value = lesson.support.replace('public\\','');
            });

            return {
                file
            }
   }

});

</script>