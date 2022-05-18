<template>
  <q-page>
    <q-card class="absolute-center">
      <q-card-section>
        <div class="text-h6 absolute-center q-ma-md">
          Ajouter une publication
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-xl" style="width: 500px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="data.title" label="Titre"></q-input>
            <q-input
              type="textarea"
              v-model="data.content"
              label="Contenu"
            ></q-input>
            <!-- <q-input v-model="data.tag" label="Tag"></q-input> -->
            <q-select
              filled
              v-model="data.tag"
              :options="tags"
              use-chips
              stack-label
              label="Tag"
            />
            <div>
              <q-btn label="Ajouter" type="submit" color="primary" />
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
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const data = ref({
  title: "",
  content: "",
  tag: "",
});

const tags = ref([
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
]);

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const create = (data) => {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      api.post("/threads/new/" + userId, data).then((res) => {
        console.log(res);
        //if http status is 200 show success message
        if (res.status === 201) {
          $q.notify({
            color: "positive",
            textColor: "white",
            message: "La publication a été créé",
          });
        } else {
          $q.notify({
            color: "negative",
            textColor: "white",
            message: "Erreur",
          });
        }
      });
    };

    const onSubmit = () => {
      if (
        data.value.title == "" ||
        data.value.content == "" ||
        data.value.tag == ""
      ) {
        $q.notify({
          color: "negative",
          textColor: "white",
          message: "tous les champs sont obligatoires",
        });
        return;
      }
      create(data.value);
    };

    return {
      onSubmit,
      data,
      tags,
    };
  },
});
</script>