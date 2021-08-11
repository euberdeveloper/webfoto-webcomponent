<template>
  <div class="web-foto">
    <loading-spinner class="cover layer loading-spinner" :color="spinnerColor" :show="loadingImage" />
    <image-displayer class="cover" :image="currentImagePath" :loading.sync="loadingImage" v-if="currentImagePath" />
    <date-controller class="cover layer" :value.sync="currentImageDate" :dates="images" v-if="currentImageDate" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { getImages } from "@/utils/api";

import ImageDisplayer from "@/components/gears/ImageDisplayer.vue";
import LoadingSpinner from "@/components/gears/LoadingSpinner.vue";
import DateController from "@/components/gears/DateController.vue";

@Component({
  components: {
    ImageDisplayer,
    LoadingSpinner,
    DateController
  },
})
export default class WebFoto extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, required: true })
  apiUrl!: string;

  @Prop({ type: String, required: false })
  spinnerColor?: string;

  /* DATA */

  private images: Date[] = [];
  private currentImageDate: Date | null = null;
  private loadingImage = false;

  /* GETTERS */

  get currentImagePath(): string | null {
    return this.currentImageDate ? `${this.apiUrl}/${this.name}/${this.name}_${this.currentImageDate.toISOString()}.jpg` : null;
  }

  /* METHODS */

  goToLastImage(): void {
    this.currentImageDate = this.images[this.images.length - 1];
  }

  /* LIFE CYCLE */

  async mounted(): Promise<void> {
    this.images = await getImages(this.apiUrl, this.name);
    this.goToLastImage();
  }

}
</script>

<style lang="scss" scoped>
.web-foto {
  position: relative;

  .cover {
    width: 100%;
    height: 100%;
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>

