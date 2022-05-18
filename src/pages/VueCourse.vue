<template>
    <q-page class="q-ma-md " v-if="course != null">
        <q-card class="">
            <q-card-section>
                <div class="row ">
                    <q-img class="item-center" :src="course.image" spinner-color="white"
                        style="height: 280px; max-width: 300px">
                        <div class="absolute-top text-center">
                            {{ course.title }}
                        </div>
                    </q-img>

                    <div class="float-right">
                        <h5>{{ course.description }}</h5>
                        <h5>
                            <q-icon name="price_check"></q-icon>{{ course.price }}
                        </h5>
                    </div>
                </div>
            </q-card-section>
            <q-card-section>
                
                <div class="q-pa-md">
    <q-btn :to="'/course/'+course._id+'/add-lesson'"  icon="add" label="Ajouter une lesson"  color="primary" class="q-mb-md" />


                    <q-list bordered separator>
                        <q-item clickable v-ripple v-for="l in course.lessons" :key="l._id" @click="goToMeet(l._id)">
                            <q-item-section>
                                <q-item-label>{{ l.title }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </q-card-section>

            <q-card-actions>
                <q-btn flat @click="inscritCourse()">Inscrit</q-btn>
                <q-btn flat @click="acheterCourse()">acheter ce cours</q-btn>
            </q-card-actions>

        </q-card>


    </q-page>
    <div v-else>
        <h5>un erreur aux connexion de serveur </h5>
    </div>
    <!-- this part is for the payment form -->
    <q-dialog v-model="confirm" persistent>
        <q-card style="width: 700px; max-width: 80vw;" class="q-ma-md">
            <q-card-section class="row items-center">
                <q-avatar icon="local_atm" color="primary" text-color="white" />
                <span class="q-ml-sm">acheter ce course</span>
            </q-card-section>

            <q-card-section class="q-ma-md">
                <q-input class="q-ma-md" filled label="Nom"></q-input>
                <q-input class="q-ma-md" filled label="Prenom"></q-input>
                <q-input class="q-ma-md" filled label="Email"></q-input>
                <q-input class="q-ma-md" filled label="Numero de telephone"></q-input>
                <q-input class="q-ma-md" filled label="Numéro de carte"></q-input>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Acheter " color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { api } from "../boot/axios";
import { useRoute, useRouter } from "vue-router";
//get route params
import { route } from "vue-router";
import { useQuasar } from "quasar";
// var courseId = useRouter().currentRoute.params.id;
// async function getCourse(courseId) {
//     api.get("/courses/" + courseId).then(response => {
//         console.log(response.data);
//         return response.data;
//     });

// }
export default defineComponent({
    name: "VueCourse",
    setup() {
        const course = ref(null);
        var confirm = ref(false);
        const $q = useQuasar();
        const $router = useRouter();
        function getCourse(courseId) {
            api.get("/courses/" + courseId).then(response => {
                console.log(response.data);
                course.value = response.data;
                //add base url to image url
                course.value.image = api.defaults.baseURL + course.value.image.substring(7);
            });
        }
        onMounted(() => {
            console.log("Course Vue page mounted");
            //always use the function userRoute() rather than useRouter() to get the current route params
            //becareful to use the function userRoute()
            const courseId = useRoute().params.id;
            console.log(courseId);
            getCourse(courseId);
        });
        function inscritCourse() {
            //show Course inscrit success q notification
            $q.notify({
                color: "positive",
                textColor: "white",
                message: "Course inscrit avec success",
                position: "top",
                timeout: 2000
            });
        }

        function acheterCourse() {
            //show Course achat success q notification
            $q.notify({
                color: "positive",
                textColor: "white",
                message: "Course achat avec success",
                position: "top",
                timeout: 2000
            });
            this.confirm = true
        }

        function goToMeet(lessonId) {
            //go to meet page
            console.log("go to meet page");
            console.log(lessonId);
            //use the function useRouter() to get the current route params
            $router.push({
                name: "VueMeetPage",
                params: {
                    lessonId: lessonId
                }
            });
        }
        return {
            course,
            inscritCourse,
            acheterCourse,
            goToMeet,
            confirm

        }
    },

});

</script>