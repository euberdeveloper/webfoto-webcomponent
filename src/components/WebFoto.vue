<template>
  <div class="web-foto" :style="widthStyle" @mouseenter="showActions = true" @mouseleave="showActions = false">
    <image-displayer class="image-displayer" :image="currentImagePath" :loading.sync="loadingImage" v-if="currentImagePath" />
    <loading-spinner class="loading-spinner" :color="spinnerColor" :show="loadingImage" />
    <controllers
      class="controllers"
      :value="currentImageDate"
      :dates="images"
      :showTimeLapse="showTimeLapse"
      :timeLapseVelocity.sync="timeLapseVelocity"
      :timeLapseQuantity.sync="timeLapseQuantity"
      :timeLapseExtent.sync="timeLapseExtent"
      @increment="updateImage($event, 1)"
      @decrement="updateImage($event, -1)"
      @current="goToLastImage"
      @pause="timeLapseVelocity = null"
      @play="timeLapseVelocity = $event"
      v-if="currentImageDate"
    />
    <actions
      class="actions"
      :showActions="showActions"
      :textCopied="textCopied"
      :showTimeLapse="showTimeLapse"
      @share="share"
      @timelapse="showTimeLapse = !showTimeLapse"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
import clipboardCopy from "clipboard-copy";

import { Extent, PlayVelocity } from "@/types";
import { getImages } from "@/utils/api";

import ImageDisplayer from "@/components/gears/ImageDisplayer.vue";
import LoadingSpinner from "@/components/gears/LoadingSpinner.vue";
import Controllers from "@/components/gears/Controllers.vue";
import Actions from "@/components/gears/Actions.vue";

@Component({
  components: {
    ImageDisplayer,
    LoadingSpinner,
    Controllers,
    Actions,
  },
})
export default class WebFoto extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: "100%" })
  width!: string;

  @Prop({ type: String, required: true })
  apiUrl!: string;

  @Prop({ type: String, required: false })
  spinnerColor?: string;

  /* DATA */

  private images: dayjs.Dayjs[] = [];
  private currentImageIndex: number | null = null;
  private loadingImage = false;
  private showActions = false;
  private textCopied = false;
  private showTimeLapse = false;
  private timeLapseVelocity: PlayVelocity | null = null;
  private timeLapseinterval: number | null = null;
  private timeLapseQuantity = 1;
  private timeLapseExtent: Extent = "hours";

  /* GETTERS */

  get currentImageDate(): dayjs.Dayjs | null {
    return this.currentImageIndex !== null ? this.images[this.currentImageIndex] : null;
  }

  get currentImagePath(): string | null {
    return this.currentImageDate ? `${this.apiUrl}/${this.name}/${this.name}_${this.currentImageDate.toISOString()}.jpg` : null;
  }

  get lastDate(): dayjs.Dayjs | null {
    return this.images.length ? this.images[this.images.length - 1] : null;
  }
  get firstDate(): dayjs.Dayjs | null {
    return this.images.length ? this.images[0] : null;
  }

  get widthStyle(): { width: string } {
    return { width: this.width };
  }

  /* METHODS */

  goToLastImage(): void {
    this.currentImageIndex = this.images.length - 1;
  }

  private incrementImage(extent: Extent, quantity = 0): void {
    if (typeof this.currentImageIndex === "number" && this.currentImageDate) {
      const lastDate = this.lastDate as dayjs.Dayjs;

      let targetDate = this.currentImageDate.add(quantity, extent);
      if (targetDate.isAfter(lastDate)) {
        targetDate = lastDate;
      }

      let index = this.currentImageIndex;
      while (this.images[index].isBefore(targetDate) && index < this.images.length - quantity) {
        index++;
      }
      this.currentImageIndex = index;
    }
  }
  private decrementImage(extent: Extent, quantity = 0): void {
    if (typeof this.currentImageIndex === "number" && this.currentImageDate) {
      const firstDate = this.firstDate as dayjs.Dayjs;

      let targetDate = this.currentImageDate.subtract(quantity, extent);
      if (targetDate.isBefore(firstDate)) {
        targetDate = firstDate;
      }

      let index = this.currentImageIndex;
      while (this.images[index].isAfter(targetDate) && index > 0) {
        index--;
      }
      this.currentImageIndex = index;
    }
  }

  updateImage(extent: Extent, quantity = 0): void {
    if (quantity > 0) {
      this.incrementImage(extent, quantity);
    } else if (quantity < 0) {
      this.decrementImage(extent, -quantity);
    }
  }

  share(): void {
    clipboardCopy(this.currentImagePath ?? "");
    this.textCopied = true;
    setTimeout(() => (this.textCopied = false), 2000);
  }

  /* WATCHERS */

  @Watch("timeLapseVelocity")
  watchTimeLapseVelocity(): void {
    if (this.timeLapseinterval) {
      clearInterval(this.timeLapseinterval);
    }

    switch (this.timeLapseVelocity) {
      case "normal":
        this.timeLapseinterval = setInterval(() => this.updateImage(this.timeLapseExtent, this.timeLapseQuantity), 2000);
        break;
      case "fast":
        this.timeLapseinterval = setInterval(() => this.updateImage(this.timeLapseExtent, this.timeLapseQuantity), 1000);
        break;
    }
  }

  @Watch("showTimeLapse")
  watchShowTimeLapse(): void {
    if (this.timeLapseinterval) {
      clearInterval(this.timeLapseinterval);
    }

    if (!this.showTimeLapse) {
      this.timeLapseVelocity = null;
    }
  }

  /* LIFE CYCLE */

  async mounted(): Promise<void> {
    this.images = (await getImages(this.apiUrl, this.name)).map((date) => dayjs(date));
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

  .actions {
    position: absolute;
    top: 30%;
    left: 0;
    transform: translate(0, -30%);
  }
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>

