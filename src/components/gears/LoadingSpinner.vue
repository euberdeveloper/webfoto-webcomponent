<template>
  <grid-loader class="spinner" :color="color" :loading="show" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import GridLoader from "vue-spinner/src/GridLoader.vue";

@Component({
  components: {
    GridLoader,
  },
})
export default class LoadingSpinner extends Vue {
  /* PROPS */

  @Prop({ type: String, required: false })
  color?: string;

  @Prop({ type: Boolean, required: true })
  show?: boolean;
}
</script>