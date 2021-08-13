<template>
  <web-foto class="web-foto" api-url="http://localhost:3000" name="cortevalier" width="100%" height="100%" logo-src="https://it.addicted-sports.com/fileadmin/bw/LakeGarda-KiteandSurfSchool.png" logo-href="http://www.google.it" />
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
