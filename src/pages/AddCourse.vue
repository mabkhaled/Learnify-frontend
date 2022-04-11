<template>
    <q-page>
        <q-card class="absolute-center">
            <q-card-section>
                <div class="text-h6 absolute-center q-ma-md">Ajouter un Cours</div>
            </q-card-section>
            <q-card-section>
                <div class="q-pa-xl" style="width: 500px;">
                    <q-form @submit="onSubmit" class="q-gutter-md">
                        <q-input v-model="data.courseName" label="Nom de Cours">
                        </q-input>
                        <q-input v-model="data.nbrSeance" label="Nombre des Seance"> </q-input>
                        <q-select filled v-model="data.modelMultiple" multiple :options="data.options" use-chips
                            stack-label label="Multiple selection" />
                        <q-input v-model="data.CoursePrice" label="le Prix" type="number"></q-input>
                        <q-input v-model="data.courseDescription" label="Description"></q-input>



                        <div>
                            <q-btn label="Ajout Cours" type="submit" color="primary" />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm float-right" />
                        </div>
                    </q-form>
                </div>
            </q-card-section>
        </q-card>

        </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { api } from '../boot/axios'
import { useQuasar } from 'quasar'

const data = ref({
    courseName: '',
    nbrSeance: 0,
    errors: {},
    tags: '',
    CoursePrice: 0,
    courseDescription: '',
    options: [
        "coding", "design", "lifestyle", "photography", "music", "video", "marketing", "business", "languages", "programming", "social", "health", "science", "technology", "others"
    ],
    modelMultiple: ["coding"],


})
export default defineComponent({
    name: "ProfilePage",
    setup() {
        const $q = useQuasar();
        const addCourse = (CourseData) => {
            api.post('/courses', CourseData)
                .then(res => {
                    const userid = JSON.parse(localStorage.getItem('user')).id;
                    const auteurLink = "http://localhost:30263/users/" + userid + "/courses";
                    const courseLink = res.data._links.self.href;
                    api.put(auteurLink,
                        courseLink
                        , {
                            headers: {
                                'Content-Type': 'text/uri-list'
                            }
                        }).then(res => {
                            $q.notify({
                                message: 'Course added to user acount',
                                color: 'positive',
                                textColor: 'white',
                                icon: 'check'
                            })
                        })

                    //show quasar notification success
                    $q.notify({
                        color: 'positive',
                        textColor: 'white',
                        message: 'Course added successfully',
                    })
                    console.log("data is posted with success");
                    console.log(res.data);
                })

                .catch(err => {
                    //show quasar notification error
                    $q.notify({
                        color: 'negative',
                        textColor: 'white',
                        message: 'Error adding course',
                    })
                    console.log("an error occured");
                    console.log(err);
                })
            console.log("addCourse");

        }
        const onSubmit = () => {
            const CourseData = {
                title: data.value.courseName,
                nbrSeance: data.value.nbrSeance,
                //converting proxy to array of strings
                tag: JSON.parse(JSON.stringify(data.value.modelMultiple)),
                price: data.value.CoursePrice,
                desc: data.value.courseDescription,
                //modelMultiple proxy to original array


            }
            console.log(CourseData)
            addCourse(CourseData);
            console.log("submit");
        }

        return {
            onSubmit,
            data,
        }
    }

});
</script>