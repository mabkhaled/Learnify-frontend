<template>
  <q-page>
    <q-card class="absolute-center">
      <q-card-section>
        <div class="text-h6 absolute-center q-ma-md">Ajouter un Cours</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-xl" style="width: 500px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="data.courseName" label="Nom de Cours"> </q-input>
            <q-input v-model="data.nbrSeance" label="Nombre des Seance">
            </q-input>
            <q-select
              filled
              v-model="data.modelMultiple"
              multiple
              :options="data.options"
              use-chips
              stack-label
              label="Multiple selection"
            />
            <q-input
              v-model="data.CoursePrice"
              label="le Prix"
              type="number"
            ></q-input>
            <q-input
              v-model="data.courseDescription"
              label="Description"
            ></q-input>
            <!-- upload Course image -->
            <q-file
              color="purple-12"
              v-model="data.CourseImage"
              label="Course image"
              accept="image"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <div>
              <q-btn label="Ajout Cours" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm float-right"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "../boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const data = ref({
  courseName: "",
  nbrSeance: 0,
  errors: {},
  tags: "",
  CoursePrice: 0,
  courseDescription: "",
  CourseImage: ref(null),
  options: [
    "coding",
    "design",
    "lifestyle",
    "photography",
    "music",
    "video",
    "marketing",
    "business",
    "languages",
    "programming",
    "social",
    "health",
    "science",
    "technology",
    "others",
  ],
  modelMultiple: ["coding"],
});
export default defineComponent({
  name: "AddCourse",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const addCourse = (CourseData) => {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      //post the course data to /courses/new/userid and show success message if status is 200 else show error message
      api.post("/courses/new/" + userId, CourseData).then((res) => {
        console.log(res);
        //if http status is 200 show success message
        if (res.status === 200) {
          $q.notify({
            color: "positive",
            textColor: "white",
            message: "Course ajoute avec success",
          });
          router.push({ path: "dashboard" });
        } else {
          $q.notify({
            color: "negative",
            textColor: "white",
            message: "Erreur d'ajout de Cours",
          });
        }
      });
    };
    const onSubmit = () => {
      console.log(data.value.CourseImage);
      if (data.value.courseName.length == 0) {
        $q.notify({
          color: "negative",
          message: "Le nom est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
      } else if (data.value.nbrSeance == 0) {
        $q.notify({
          color: "negative",
          message: "Le nombre des seance est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
      } else if (data.value.modelMultiple.length == 0) {
        $q.notify({
          color: "negative",
          message: "Les tags sont obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
      } else if (data.value.CoursePrice.length == 0) {
        $q.notify({
          color: "negative",
          message: "Le prix est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
      } else if (data.value.courseDescription.length == 0) {
        $q.notify({
          color: "negative",
          message: "La description est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
      } else if (data.value.CourseImage == null) {
        $q.notify({
          color: "negative",
          message: "L'image est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
      }
      const formData = new FormData();
      formData.append("title", data.value.courseName);
      formData.append("nbrSeance", data.value.nbrSeance);
      formData.append(
        "tags",
        JSON.parse(JSON.stringify(data.value.modelMultiple))
      );
      formData.append("price", data.value.CoursePrice);
      formData.append("description", data.value.courseDescription);
      formData.append(
        "image",
        data.value.CourseImage,
        data.value.CourseImage.name
      );

      const CourseData = {
        title: data.value.courseName,
        nbrSeance: data.value.nbrSeance,
        //converting proxy to array of strings
        tag: JSON.parse(JSON.stringify(data.value.modelMultiple)),
        price: data.value.CoursePrice,
        description: data.value.courseDescription,
        //add course image
        image: data.value.CourseImage,
      };
      console.log(CourseData);
      addCourse(formData);
      console.log("submit");
    };

    return {
      onSubmit,
      data,
    };
  },
});
</script>