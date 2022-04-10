<template>
    <q-card class="my-card q-ma-md">
        <q-img :src="imgUrl" width="250px" height="250px">
            <div class="absolute-bottom text-subtitle2 text-center">{{ title }}</div>
        </q-img>
    </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";


export default defineComponent({
    name: "CategoryCard",
    props: {
        imgUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        return {


        }

    }
});
</script>
<style lang="sass" scoped>

.my-card
    width: 100%
    max-width: 250px
    max-height: 250px
</style>