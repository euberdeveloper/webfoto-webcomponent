<template>
  <web-foto class="web-foto" api-url="http://localhost:3000" name="cortevalier" width="100%" />
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
  margin: 25px;
}
</style>