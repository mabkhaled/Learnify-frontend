<template>
    <q-page>
        <q-card >
            <q-card-section>
                <div class="text-h6 absolute-center q-ma-md">Les Publications</div>
            </q-card-section>
            <q-card-section>
                <div class="q-pa-sm" style="width: 100%;">
                   
    <q-btn to="/threads/create"  icon="add" label="Ajouter une publication"  color="primary" class="q-mb-md" />

    <router-link :to="`/threads/${item._id}`" v-for="item in data" :key="item._id">
    <q-banner rounded class="bg-indigo-6 text-white" style="margin-bottom:15px" >
      <template v-slot:avatar>
          <q-img
      :src="item.user.profilePic"
      spinner-color="white"
      style="height: 50px; width: 50px;    border-radius: 50%;
"
    />
      </template>

     {{item.user.firstName}}
     {{item.user.lastName}}
     <hr/>
     <p class="q-mt-md">{{item.content}}</p>

      <template v-slot:action>
       {{item.createdAt}}
      </template>
    </q-banner></router-link>

                </div>
            </q-card-section>
        </q-card>

    </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "src/boot/axios";
import { useQuasar } from 'quasar'

const data = ref([])

// const threads = ref(['']);

export default defineComponent({
    setup() {

const $q = useQuasar();
        
         function getThreads() {
            api.get("/threads/").then(response => {
                console.log(response.data);
                data.value = response.data;
            });
        }

        onMounted(() => {
            getThreads();
        });

        return {
            data,
        }

    },
});
</script>