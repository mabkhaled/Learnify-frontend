<template>
    <q-card class="my-card q-ma-md">
        <q-img :src="imgUrl" />

        <q-card-section>
            <q-btn fab color="primary" icon="shopping_cart" class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);" />

            <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">{{ title }}</div>
                <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    <q-icon name="paid" />
                    {{ price }} DT
                </div>
            </div>

            <q-rating v-model="star" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle1">Course Subtitle</div>
            <div class="text-caption text-grey">{{ description }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="visibility" />
            <q-btn flat color="primary">Voire</q-btn>
        </q-card-actions>
        </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
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
        price: {
            type: Number,
            required: true,
        },
        stars: {
            type: Number,
            required: true,
            default: 2,
        },
        description: {
            type: String,
            required: true,
            default: null
        },

    },
    setup(props) {
        return {
            star: ref(props.stars),

        }

    }
});
</script>
<style lang="sass" scoped>

.my-card
    width: 200px
    max-width: 300px
</style>