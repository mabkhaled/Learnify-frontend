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
            <q-btn flat color="primary" @click="voireCourse()">Voire</q-btn>
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
            required: true,
        },
        title: {
            required: true,
        },
        price: {
            required: true,
        },
        stars: {
            required: true,
            default: 2,
        },
        description: {
            required: true,
            default: null
        },
        id: {
            required: true,
            default: null
        },

    },
    setup(props) {
        const $router = useRouter();
        return {
            star: ref(props.stars),
            voireCourse() {
                //create course object
                const courseObj = {
                    title: props.title,
                    price: props.price,
                    description: props.description,
                    imgUrl: props.imgUrl,
                    id: props.id,
                    stars: props.stars,
                };
                //set course object to local storage
                localStorage.setItem("SelectedCourse", JSON.stringify(courseObj));
                //push to course page with course data

                $router.push("/course/" + props.id);
            }

        }

    }
});
</script>
<style lang="sass" scoped>

.my-card
    width: 200px
    max-width: 300px
</style>