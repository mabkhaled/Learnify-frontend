<template>
  <q-page>
    <q-card class="absolute-center">
      <q-card-section>
        <div class="text-h6 absolute-center q-ma-md">
          Ajouter une lesson
        </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-xl" style="width: 500px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="data.title" label="Titre"></q-input>
            <q-input v-model="data.meetCode" label="Code Meet"></q-input>
            <q-file  v-model="data.file" label="Ficher ">
        <template v-slot:append>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
          </q-avatar>
        </template>
      </q-file>

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
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const data = ref({
  title: "",
  meetCode: "",
  file: null
});


export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const courseId = useRoute().params.id;
    const create = () => {
      const formData = new FormData();
      formData.append("title", data.value.title);
      if(data.value.meetCode.length != 0){
        formData.append("meetCode", data.value.meetCode);
      }
      if(data.value.file != null){
        formData.append(
            "support",
            data.value.file
        );
      }

      api.post("/lessons/new/" + courseId, formData).then((res) => {
          $router.push({ name: "course",params:{id : courseId} });
      });
    };

    const onSubmit = () => {
     if(data.value.title.length == 0){
         $q.notify({
          color: "negative",
          message: "La titre est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
     }
     if(data.value.meetCode.length == 0 && data.value.file == null){
         $q.notify({
          color: "negative",
          message: "La code meet/ Un fichier est obligatoire",
          position: "bottom",
          timeout: 3000,
        });
        return;
     }
     create();
    };

    return {
      onSubmit,
      data
    };
  },
});
</script>