<template>
  <div :style="sizeStyle" class="image-displayer" @click="$emit('click')">
    <transition name="image">
      <img :style="sizeStyle" ref="testa" class="image" v-show="activeImageIndex === 0" key="testa" @click="$emit('click')" />
    </transition>
    <transition name="image">
      <img :style="sizeStyle" ref="croce" class="image" v-show="activeImageIndex === 1" key="croce" @click="$emit('click')" />
    </transition>
    <div :style="sizeStyle" class="ghost-container">
      <img :style="sizeStyle" ref="ghost" class="ghost" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from "vue-property-decorator";

import { fetchImage } from "@/utils/api";

@Component
export default class ImageDisplayer extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  image!: string;

  @Prop({ type: Boolean, required: true })
  loading!: boolean;

  @Prop({ type: Boolean, required: true })
  stretchWidth!: boolean;

  @Prop({ type: Boolean, required: true })
  stretchHeight!: boolean;

  @Prop({ type: Number, required: true })
  minZindex!: number;

  /* REFS */

  @Ref()
  testa!: HTMLImageElement;
  @Ref()
  croce!: HTMLImageElement;
  @Ref()
  ghost!: HTMLImageElement;

  /* DATA */

  private readonly spinnerTimeThreshold = 250;
  private activeImageIndex = 0;

  /* GETTERS AND SETTERS */

  get internalLoading(): boolean {
    return this.loading;
  }
  set internalLoading(loading: boolean) {
    this.$emit("update:loading", loading);
  }

  get imagesElements(): HTMLImageElement[] {
    return [this.testa, this.croce];
  }

  get currentImage(): HTMLImageElement {
    return this.imagesElements[this.activeImageIndex];
  }
  get oldImage(): HTMLImageElement {
    return this.imagesElements[(this.activeImageIndex + 1) % 2];
  }

  get sizeStyle(): { width: string; height: string } {
    return {
      width: this.stretchWidth ? '100%' : 'auto',
      height: this.stretchHeight ? '100%' : 'auto'
    };
  }

  /* METHODS */

  private incrementIndex(): void {
    this.activeImageIndex = (this.activeImageIndex + 1) % 2;
  }

  private async fetchImage(): Promise<string> {
    let interval = setInterval(() => (this.internalLoading = true), this.spinnerTimeThreshold);
    try {
      const newImageUrl = await fetchImage(this.image);
      return newImageUrl;
    } finally {
      clearInterval(interval);
      this.internalLoading = false;
    }
  }

  private prepareImageSwap(newImageUrl: string): void {
    this.oldImage.src = newImageUrl;
    this.oldImage.style.zIndex = `${this.minZindex}`;
    this.currentImage.style.zIndex = `${this.minZindex + 1}`;
    this.ghost.src = newImageUrl;
  }

  private async imageChanged(): Promise<void> {
    const newImageUrl = await this.fetchImage();
    this.prepareImageSwap(newImageUrl);
    this.incrementIndex();
  }

  /* WATCHERS */

  @Watch("image")
  watchImage(): void {
    this.imageChanged();
  }

  /* LIFE CYCLE */

  mounted(): void {
    this.imageChanged();
  }
}
</script>

<style lang="scss" scoped>
.image-displayer {
  position: relative;

  .image {
    position: absolute;
    top: 0;
    left: 0;

    display: block;
  }

  .ghost-container {
    position: relative;

    .ghost {
      display: block;
      visibility: hidden;
    }
  }
}

.image-leave-active {
  transition: opacity 1s;
}
.image-leave-to {
  opacity: 0;
}
</style>