<template>
  <web-foto class="web-foto" api-url="https://api.fotowebcam.it/api/index.php" images-url="https://api.fotowebcam.it/albums" name="hotelvillaletizia" width="100%" height="100%" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import WebFoto from '@/components/WebFoto.vue';

@Component({
  components: {
    WebFoto
  }
})
export default class App extends Vue {
}
</script>


<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

body {
  overflow-y: hidden;
}
</style>
