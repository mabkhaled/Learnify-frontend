<template>
  <q-page>
    <!-- this is the first row created with flex system row -->
    <div class="row justify-center">
      <!-- this is the first column created with flex system col -->
      <!-- search input-->
      <search-bar></search-bar>
    </div>

    <div class="row justify-center">
      <category-card v-for="c in coursesCategories" :key="c.id" :imgUrl="c.imgUrl" :title="c.title"></category-card>
    </div>
    <!-- this is the secound column created with flex system col -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";
import CategoryCard from "src/components/categoryCard.vue";
import SearchBar from "../components/SearchBar.vue";

const coursesCategories = [
  {
    id: 1,
    name: "Coding",
    imgUrl: "img/coding.jpg",
    title: "Coding",
  },
  {
    id: 2,
    name: "Design",
    imgUrl: "img/design.png",
    title: "Design",
  },
  {
    id: 3,
    name: "Business",
    imgUrl: "img/business.jpg",
    title: "Business",
  },
  {
    id: 4,
    name: "Lifestyle",
    imgUrl: "img/lifestyle.jpg",
    title: "Lifestyle",
  },
];

export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      text: "",
      coursesCategories,
      search() {
        console.log(this.text);
        api.get("/search", {
          params: {
            text: this.text,
          },
        });
      },
    };
  },
  components: { CategoryCard, SearchBar }
});
</script>
