<template>
  <div class="web-foto">
    <image-displayer class="image-displayer" :image="currentImagePath" :loading.sync="loadingImage" v-if="currentImagePath" />
    <loading-spinner class="loading-spinner" :color="spinnerColor" :show="loadingImage" />
    <date-controller
      class="controllers"
      :value="currentImageDate"
      :dates="images"
      @increment="incrementImage($event)"
      @decrement="decrementImage($event)"
      @current="goToLastImage"
      v-if="currentImageDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as dayjs from 'dayjs';

import { getImages } from "@/utils/api";

import ImageDisplayer from "@/components/gears/ImageDisplayer.vue";
import LoadingSpinner from "@/components/gears/LoadingSpinner.vue";
import DateController from "@/components/gears/Controllers.vue";

type Extent = "year" | "month" | "day" | "hours" | "minutes";

@Component({
  components: {
    ImageDisplayer,
    LoadingSpinner,
    DateController,
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
  private currentImageIndex: number | null = null;
  private loadingImage = false;

  /* GETTERS */

  get currentImageDate(): Date | null {
    return this.currentImageIndex ? this.images[this.currentImageIndex] : null;
  }

  get currentImagePath(): string | null {
    return this.currentImageDate ? `${this.apiUrl}/${this.name}/${this.name}_${this.currentImageDate.toISOString()}.jpg` : null;
  }

  /* METHODS */

  private extentToMillis(extent: Extent): number {
    switch (extent) {
      case "year":
        return 31536000000;
      case "month":
        return 2592000000;
      case "day":
        return 86400000;
      case "hours":
        return 3600000;
      case "minutes":
        return 60000;
    }
  }

  goToLastImage(): void {
    this.currentImageIndex = this.images.length - 1;
  }

  incrementImage(extent: Extent): void {
    if (this.currentImageIndex && this.currentImageDate) {
      const targetDate = new Date(+this.currentImageDate + this.extentToMillis(extent));

      let index = this.currentImageIndex;
      while (this.images[index] < targetDate && index < this.images.length) {
        index++;
      }

      if (this.images[index]) {
        this.currentImageIndex = index;
      }
    }
  }
  decrementImage(extent: Extent): void {
    if (this.currentImageIndex && this.currentImageDate) {
      const targetDate = new Date(+this.currentImageDate - this.extentToMillis(extent));

      let index = this.currentImageIndex;
      while (this.images[index] > targetDate && index > 0) {
        index--;
      }

      if (this.images[index]) {
        this.currentImageIndex = index;
      }
    }
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

  .image-displayer {
    position: relative;
  }

  .loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .controllers {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>

