<template>
  <q-page>
    <!-- this is the first row created with flex system row -->
    <div class="row justify-center">
      <!-- this is the first column created with flex system col -->
      <!-- search input-->
      <search-bar></search-bar>
    </div>
    <!-- this is the secound row created with flex system col -->
    <div class="row justify-center">
      <category-card v-for="c in coursesCategories" :key="c.id" :imgUrl="c.imgUrl" :title="c.title"></category-card>
    </div>
    <div class="row">
      <course-card
        v-for="c in CourseList"
        :key="c.id"
        :imgUrl="c.imgUrl"
        :title="c.title"
        :price="c.price"
        :stars="c.stars"
      ></course-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";
import { useRouter } from "vue-router";
import CategoryCard from "src/components/categoryCard.vue";
import SearchBar from "../components/SearchBar.vue";
import CourseCard from "../components/CourseCard.vue";

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


//list of courses


const CourseList = [
  {
    id: 1,
    imgUrl: "img/course.jpg",
    title: "Course 1",
    price: "10",
    stars: 4,
  },
  {
    id: 2,
    imgUrl: "img/course.jpg",
    title: "Course 2",
    price: "25.5",
    stars: 3,
  },
  {
    id: 3,
    imgUrl: "img/course.jpg",
    title: "Course 3",
    price: "35",
    stars: 2,
  },
  {
    id: 4,
    imgUrl: "img/course.jpg",
    title: "Course 4",
    price: "15.0",
    stars: 1,
  },
    {
    id: 5,
    imgUrl: "img/course.jpg",
    title: "Course 5",
    price: "15.0",
    stars: 1,
  },
    {
    id: 6,
    imgUrl: "img/course.jpg",
    title: "Course 6",
    price: "15.0",
    stars: 2,
  },
    {
    id: 7,
    imgUrl: "img/course.jpg",
    title: "Course 7",
    price: "15.0",
    stars: 2,
  },
    {
    id: 8,
    imgUrl: "img/course.jpg",
    title: "Course 8",
    price: "15.0",
    stars: 5,
  },
    {
    id: 9,
    imgUrl: "img/course.jpg",
    title: "Course 9",
    price: "15.0",
    stars: 4,
  },
    {
    id: 10,
    imgUrl: "img/course.jpg",
    title: "Course 10",
    price: "15.0",
    stars: 5,
  },
    {
    id: 11,
    imgUrl: "img/course.jpg",
    title: "Course 11",
    price: "15.0",
    stars: 3,
  },
    {
    id: 12,
    imgUrl: "img/course.jpg",
    title: "Course 12",
    price: "15.0",
    stars: 1,
  },
    {
    id: 13,
    imgUrl: "img/course.jpg",
    title: "Course 13",
    price: "15.0",
    stars: 3,
  },
    {
    id: 14,
    imgUrl: "img/course.jpg",
    title: "Course 14",
    price: "15.0",
    stars: 2,
  },
    {
    id: 15,
    imgUrl: "img/course.jpg",
    title: "Course 15",
    price: "15.0",
    stars: 5,
  },
    {
    id: 16,
    imgUrl: "img/course.jpg",
    title: "Course 16",
    price: "15.0",
    stars: 1,
  },
    {
    id: 17,
    imgUrl: "img/course.jpg",
    title: "Course 17",
    price: "15.0",
    stars: 3,
  },
    {
    id: 18,
    imgUrl: "img/course.jpg",
    title: "Course 18",
    price: "15.0",
    stars: 4,
  },
    

];

export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      text: "",
      coursesCategories,
      CourseList,
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
  components: { CategoryCard, SearchBar, CourseCard }
});
</script>
