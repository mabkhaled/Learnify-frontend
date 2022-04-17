<template>
    <q-page>
        <div class="absolute-center">
            <h6>This page is for the Home Page you can Modifier this countent with any html code you want in
                src/pages/Home.vue</h6>
        </div>
        <!-- <AddLesson></AddLesson> -->
    </q-page>
</template>
<script>
import { defineComponent } from "vue";
import AddLesson from "./AddLesson.vue";

export default defineComponent({
    name: "Home",
});
</script>