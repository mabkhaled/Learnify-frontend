<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <p>{{ userData }}</p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "../boot/axios";

const getUserDetails = () => {
  api.get('/api/auth/getauthuser', {
    withCredentials: true,
  }).then(res => {
    return res.data;
  })
}
const userData = getUserDetails();
export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
      userData,
    }
  }
});
</script>
