<template>
  <div class="loading-spinner">
    <grid-loader class="spinner" :color="color" :loading="show" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import GridLoader from 'vue-spinner/src/GridLoader.vue';

@Component({
  components: {
    GridLoader
  }
})
export default class LoadingSpinner extends Vue {
  /* PROPS */

  @Prop({ type: String, required: false })
  color?: string;

  @Prop({ type: Boolean, required: true })
  show?: boolean;
}
</script>

<style lang="scss" scoped>
.loading-spinner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
