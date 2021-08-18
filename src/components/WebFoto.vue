<template>
  <div class="web-foto" :style="sizeStyle" @mouseenter="showActions = true" @mouseleave="showActions = false">
    <image-displayer
      class="image-displayer"
      :style="zIndexStyle"
      :minZindex="minZindex"
      :image="currentImagePath"
      :stretchWidth="width !== 'auto'"
      :stretchHeight="height !== 'auto'"
      :loading.sync="loadingImage"
      v-if="currentImagePath"
    />
    <loading-spinner class="loading-spinner" :style="zIndexStyle" :color="spinnerColor" :show="loadingImage" />
    <controllers
      class="controllers"
      :style="zIndexStyle"
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
      :style="zIndexStyle"
      :showActions="showActions"
      :textCopied="textCopied"
      :showTimeLapse="showTimeLapse"
      @share="share"
      @timelapse="showTimeLapse = !showTimeLapse"
    />
    <brand-logo class="brand-logo" :style="zIndexStyle" :src="logoSrc" :href="logoHref" :width="logoWidth" :widthMobile="logoWidthMobile" v-if="logoSrc" />
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
import BrandLogo from "@/components/gears/BrandLogo.vue";

@Component({
  components: {
    ImageDisplayer,
    LoadingSpinner,
    Controllers,
    Actions,
    BrandLogo,
  },
})
export default class WebFoto extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: "auto" })
  width!: string;

  @Prop({ type: String, default: "auto" })
  height!: string;

  @Prop({ type: String, required: true })
  apiUrl!: string;

  @Prop({ type: String, required: true })
  imagesUrl!: string;

  @Prop({ type: String, required: false })
  spinnerColor?: string;

  @Prop({ type: String, required: false })
  logoSrc?: string;

  @Prop({ type: String, required: false })
  logoHref?: string;

  @Prop({ type: String, default: "150px" })
  logoWidth!: string;

  @Prop({ type: String, default: "70px" })
  logoWidthMobile!: string;

  @Prop({ type: Number, default: -1 })
  minZindex!: number;

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
    return this.currentImageDate ? `${this.imagesUrl}/${this.name}/${this.currentImageDate.toISOString().slice(0, -5)}.jpg` : null;
  }

  get lastDate(): dayjs.Dayjs | null {
    return this.images.length ? this.images[this.images.length - 1] : null;
  }
  get firstDate(): dayjs.Dayjs | null {
    return this.images.length ? this.images[0] : null;
  }

  get sizeStyle(): { width: string; height: string } {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get zIndexStyle(): { zIndex: number } {
    return {
      zIndex: this.minZindex + 1,
    };
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
    const textToCopy = this.currentImagePath || "";
    clipboardCopy(textToCopy);
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
  display: inline-block;

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
    right: 0;
    transform: translate(0, -30%);
  }

  .brand-logo {
    position: absolute;
    top: 30%;
    left: 0;
    transform: translate(0, -30%);
  }
}
</style>

