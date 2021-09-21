<template>
  <div class="you-tube">
    <iframe :src="youtubeUrl" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class YouTube extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  youtubeId!: string;

  /* GETTERS */

  get youtubeUrl(): string | null {
    return this.youtubeId ? `https://www.youtube.com/embed/${this.youtubeId}?autoplay=1&mute=1` : null;
  }
}
</script>

<style lang="scss" scoped>
.you-tube {
  width: 100%;
  height: 100%;
}
</style>
