<template>
  <web-foto class="web-foto" apiUrl="http://localhost:3000" name="hotelcampagnola" />
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

<style lang="scss" scoped>
.web-foto {
  width: 50%;
}
</style>

