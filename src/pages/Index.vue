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
      <category-card
        v-for="c in coursesCategories"
        :key="c.id"
        :imgUrl="c.imgUrl"
        :title="c.title"
      ></category-card>
    </div>
    <div class="row">
      <course-card
        v-for="c in CourseList"
        :key="c._id"
        :id="c._id"
        :imgUrl="baseURL + c.image.substring(7)"
        :title="c.title"
        :wish="c.wish"
        @updatewish="updateWish"
        :price="c.price"
        :stars="c.stars"
        :description="c.description.substring(0, 30) + '...'"
      >
      </course-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
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

const CourseList = ref([]);
const wishList = ref([]);

const updateWish = (id) => {
  // check if course in wish list
  let courseIndex = CourseList.value.findIndex(el=>el._id == id);
  // alert(courseIndex)
   const userId = JSON.parse(localStorage.getItem('user'))._id;
  if(CourseList.value[courseIndex].wish){
     // remove from wish
      api.post(`/users/wishremove/${userId}`, {courseid:id}).then(res => {
                
      })
  }else{
    // add to wish
      api.post(`/users/wish/${userId}`, {courseid:id}).then(res => {
                
      })
  }

  CourseList.value[courseIndex].wish = !CourseList.value[courseIndex].wish
};


export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      text: "",
      coursesCategories,
      CourseList,
      baseURL: api.defaults.baseURL,
      getCourses() {
        const userDetails = JSON.parse(localStorage.getItem("user"))._id;
        //comenting this part of code to get all courses and to be replaced with the new api logic
        api.get("/courses").then((res) => {
          console.log("course data fetched");
          this.CourseList = res.data;
          console.log(this.CourseList);
          //if the CourseList desc is null then set it to no description available
          this.CourseList.forEach((course) => {
            if (course.description == null) {
              course.description = "No description available";
            }
            course.wish = false;
          });

           this.getWishList();
        });
        //log the base default url
        console.log(api.defaults.baseURL);
      },
      search() {
        console.log(this.text);
        api.get("/search", {
          params: {
            text: this.text,
          },
        });
      },
      getWishList(){
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        return api.get(`/users/wish/${userId}`).then((res) => {
          // WishList.value = res.
          console.log("wish list : ");
          console.log(res.data);
          // wishList.value = res.data;

          res.data.forEach(el => {
              // alert(el._id);
              CourseList.value.forEach((course) => {
                if(el._id == course._id){
                  course.wish = true;
                }
              });
          })
        });
      },
      wishList,
      updateWish
    };
  },
  mounted() {
    this.getCourses();
  },
  components: { CategoryCard, SearchBar, CourseCard },
});
</script>
