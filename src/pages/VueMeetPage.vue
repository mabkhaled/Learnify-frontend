<template>

  <q-page>
    <div class="absolute-center">
      <div id="meet"></div>
    </div>
  </q-page>

</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "VueMeetPage",
  setup() {
    const $route = useRoute()
  },
  mounted() {
    //get the id from the url
    const lessonId = this.$route.params.lessonId;
    //log the id
    console.log("meet id : ", lessonId);
    const domain = "meet.jit.si";
    const options = {
      roomName: lessonId,
      width: 700,
      height: 700,
      parentNode: document.querySelector("#meet"),

    };
    const api = new JitsiMeetExternalAPI(domain, options);
    setTimeout(() => {
      // why timeout: I got some trouble calling event listeners without setting a timeout :)

      // when local user is trying to enter in a locked room 
      api.addEventListener('passwordRequired', () => {
        api.executeCommand('password', "yourRoomPass");
      });

      // when local user has joined the video conference 
      api.addEventListener('videoConferenceJoined', (response) => {
        api.executeCommand('password', "yourRoomPass");
      });

    }, 10);

  }
});
</script>