<template>
  <Error404 v-if="error" />
  <q-page v-if="loading">
    <q-card>
      <q-card-section> Loading ... </q-card-section>
    </q-card>
  </q-page>
  <q-page v-if="!error && !loading">
    <q-card>
      <q-card-section>
        <q-banner
          rounded
          class="bg-indigo-6 text-white"
          style="margin-bottom: 15px"
        >
          <template v-slot:avatar>
            <q-img
              :src="data.user.profilePic"
              spinner-color="white"
              style="height: 50px; width: 50px; border-radius: 50%"
            />
          </template>

          {{ data.user.firstName }}
          {{ data.user.lastName }}
          <hr />
          <p class="q-mt-md">{{ data.content }}</p>

          <template v-slot:action>
            {{ dataFormate(data.createdAt) }}
          </template>
        </q-banner>

        <q-card-section>
          <div class="text-h6">Les Commentaires :</div>

          <q-card v-for="comment in data.comments" :key="comment._id">
            <q-banner
              rounded
              class="bg-indigo-5 text-white"
              style="margin-bottom: 15px"
            >
              <template v-slot:avatar>
                <q-img
                  :src="
                    'http://localhost:3000/' +
                    comment.user.profilePic.replace('public', '')
                  "
                  spinner-color="white"
                  style="height: 50px; width: 50px; border-radius: 50%"
                />
              </template>

              {{ comment.user.firstName }}
              {{ comment.user.lastName }}
              <hr />
              <p class="q-mt-md">{{ comment.content }}</p>

              
                  <q-btn v-if="comment.user._id == userID" @click="deleteComment(comment._id)" color="red" size="10px">Supprimer</q-btn>


              <template v-slot:action>
                {{ dataFormate(comment.createdAt) }}
              </template>
            </q-banner>
          </q-card>

          <q-card>
            <q-card-section>
              <q-input
                v-model="comment"
                type="textarea"
                label="Ajouter un commentaire"
                style="height: 80px"
              />

              <q-btn @click="submitComment" color="primary" label="Ajouter" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import Error404 from "./../Error404.vue";
const data = ref();
const loading = ref(true);
// const loadingComments = ref(false);
const error = ref(false);
const comment = ref("");
// const threads = ref(['']);
const userID = ref(null);
const threadID = ref(null);

export default defineComponent({
  components: {
    Error404,
  },
  setup() {


      userID.value = JSON.parse(localStorage.getItem('user'))._id;
    const $q = useQuasar();

    function getThread(id) {
      api.get(`/threads/${id}`).then((response) => {
        loading.value = false;
        if (response.data.status == "error") {
          error.value = true;
          return;
        }
        error.value = false;
        data.value = response.data;
        console.log(data.value.comments);
      });
    }

    onMounted(() => {
      threadID.value = useRoute().params.id;
    //   console.log(id);
      getThread(threadID.value);
    });

    const dataFormate = (date) => {
      let d = new Date(date);
      return ` ${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    };

    const submitComment = () => {
      if (comment.value == "") {
        $q.notify({
          color: "negative",
          textColor: "white",
          message: "Error",
        });
        return;
      }

      api.post(`/comments/new`,{
          content : comment.value,
          userid : JSON.parse(localStorage.getItem('user'))._id,
          threadid : data.value._id
      }).then((response) => {
          getThread(data.value._id);
          comment.value = '';
      });

    };

    const deleteComment = (id) => {
        // loading.value = true;

         api.delete(`/comments/delete/${id}`,{}).then((response) => {
        getThread(threadID.value);
      });
    }
    return {
        userID,
      error,
      loading,
      data,
      dataFormate,
      comment,
      submitComment,
      deleteComment
    };
  },
});
</script>