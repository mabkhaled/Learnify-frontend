<template>
  <q-page>
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
import CourseCard from "../components/CourseCard.vue";


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

      CourseList.value = CourseList.value.filter(el => el._id !== id);
  }else{
    // add to wish
      api.post(`/users/wish/${userId}`, {courseid:id}).then(res => {
                
      })
  }

//   CourseList.value[courseIndex].wish = !CourseList.value[courseIndex].wish
};


export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      text: "",
      CourseList,
      baseURL: api.defaults.baseURL,
      getCourses() {
        const userDetails = JSON.parse(localStorage.getItem("user"))._id;
        //comenting this part of code to get all courses and to be replaced with the new api logic
        api.get(`/users/wish/${userDetails}`).then((res) => {
          console.log("course data fetched");
          this.CourseList = res.data;
          console.log(this.CourseList);
          //if the CourseList desc is null then set it to no description available
          this.CourseList.forEach((course) => {
            if (course.description == null) {
              course.description = "No description available";
            }
            course.wish = true;
          });

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
      wishList,
      updateWish
    };
  },
  mounted() {
    this.getCourses();
  },
  components: {CourseCard },
});
</script>
