<template>
  <transition name="fade">
    <div class="time-lapse" v-if="show">
      <div class="container controller-block">
        <controller-button class="button" icon="play" @click="start" v-if="!started" />
        <controller-button class="button" icon="pause" @click="stop" v-else />
        <vue-slider class="slider" v-model="wrapperSliderValue" :tooltipPlacement="sliderTooltipPlacement" :data="sliderData" hideLabel contained lazy />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import dayjs from "dayjs";

import VueSlider from "vue-slider-component";
import ControllerButton from "@/components/shared/ControllerButton.vue";

@Component({
  components: {
    VueSlider,
    ControllerButton,
  },
})
export default class TimeLapse extends Vue {
  /* PROPS */

  @Prop({ type: Array, required: true })
  dates!: dayjs.Dayjs[];

  @Prop({ type: Number, required: true })
  currentImageIndex!: number;

  @Prop({ type: Number, required: true })
  timeLapseMaxItems!: number;

  /* DATA */

  private sliderValue = 0;
  private show = false;
  private started = false;
  private interval = -1;

  /* GETTERS AND SETTERS */

  get sliderOneEvery(): number {
    return this.dates.length > this.timeLapseMaxItems ? Math.floor(this.dates.length / this.timeLapseMaxItems) : 1;
  }

  get sliderTooltipPlacement(): string {
    if (this.wrapperSliderValue === 0) {
      return "right";
    } else if (this.wrapperSliderValue === this.sliderData.length - 1) {
      return "left";
    } else {
      return "top";
    }
  }

  get wrapperSliderValue(): number {
    return Math.floor(this.currentImageIndex / this.sliderOneEvery);
  }
  set wrapperSliderValue(value: number) {
    this.$emit("slider", value * this.sliderOneEvery);
  }

  get sliderData(): { label: string; value: number }[] {
    const dates = this.sliderOneEvery <= 1 ? this.dates : this.dates.filter((_el, index) => index % this.sliderOneEvery === 0);

    return dates.map((date, index) => ({
      label: date.format("DD/MM/YYYY HH:mm"),
      value: index,
    }));
  }

  /* MEHTODS */

  start(): void {
    this.started = true;
    this.interval = setInterval(() => {
      this.wrapperSliderValue = (this.wrapperSliderValue + 1) % this.timeLapseMaxItems;
    }, 1500);
  }
  stop(): void {
    clearInterval(this.interval);
    this.started = false;
  }

  /* LIFE CYCLE */

  mounted(): void {
    setTimeout(() => {
      this.show = true;
    }, 10);
  }
}
</script>

<style lang="scss" scoped>
.time-lapse {
  width: 100%;

  .controller-block {
    padding: 0 12px;
    height: 50px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-family: "Exo 2 Medium", sans-serif;
    font-size: 14px;
    color: white;
  }

  .container {
    background-color: #1d1d1c80;
    // overflow-x: hidden;

    > .slider {
      flex: 1;
      margin-left: 12px;
      margin-right: 5px;
    }
  }

  .button {
    margin: 0 2px;
  }
}

@media screen and (max-width: 720px) {
  .controllers {
    .controller-block {
      height: 64px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 500ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* shitty fix for webcomponent, the css is embedded here but even modified */
.slider ::v-deep {
  /* component style */
  .vue-slider-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* rail style */
  .vue-slider-rail {
    background-color: #ccc;
    border-radius: 15px;
    // Modified by me
    position: relative;
    height: 4px;
  }

  /* process style */
  .vue-slider-process {
    background-color: #3498db;
    border-radius: 15px;
  }

  /* mark style */
  .vue-slider-marks {
    width: 100%;
    // Modified by me
    position: absolute;
    height: 4px;
    top: 0;
    left: 0;
  }
  .vue-slider-mark {
    z-index: 4;
    // Modified by me
    position: absolute;
    top: 0;
  }
  .vue-slider-mark:first-child .vue-slider-mark-step,
  .vue-slider-mark:last-child .vue-slider-mark-step {
    display: none;
  }
  .vue-slider-mark-step {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.16);
  }
  .vue-slider-mark-label {
    font-size: 14px;
    white-space: nowrap;
  }
  /* dot style */
  .vue-slider-dot {
    // Modified by me
    position: relative;
    top: calc(50% - 4px) !important;
  }
  .vue-slider-dot-handle {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
  }
  .vue-slider-dot-handle-focus {
    box-shadow: 0px 0px 1px 2px rgba(52, 152, 219, 0.36);
  }

  .vue-slider-dot-handle-disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }

  .vue-slider-dot-tooltip {
    // Modified by me
    position: absolute;
  }
  .vue-slider-dot-tooltip-top {
    // Modified by me
    top: -10px;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  .vue-slider-dot-tooltip-left {
    // Modified by me
    left: -10px;
    top: 50%;
    transform: translate(-100%, -50%);
  }
  .vue-slider-dot-tooltip-right {
    // Modified by me
    right: -10px;
    top: 50%;
    transform: translate(100%, -50%);
  }
  .vue-slider-dot-tooltip-inner {
    font-size: 14px;
    white-space: nowrap;
    padding: 2px 5px;
    min-width: 20px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    border-color: #3498db;
    background-color: #3498db;
    box-sizing: content-box;
  }
  .vue-slider-dot-tooltip-inner::after {
    content: "";
    position: absolute;
  }
  .vue-slider-dot-tooltip-inner-top::after {
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    height: 0;
    width: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px;
    border-top-color: inherit;
  }
  .vue-slider-dot-tooltip-inner-bottom::after {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 0);
    height: 0;
    width: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px;
    border-bottom-color: inherit;
  }
  .vue-slider-dot-tooltip-inner-left::after {
    left: 100%;
    top: 50%;
    transform: translate(0, -50%);
    height: 0;
    width: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px;
    border-left-color: inherit;
  }
  .vue-slider-dot-tooltip-inner-right::after {
    right: 100%;
    top: 50%;
    transform: translate(0, -50%);
    height: 0;
    width: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 5px;
    border-right-color: inherit;
  }

  .vue-slider-dot-tooltip-wrapper {
    opacity: 0;
    transition: all 0.3s;
  }
  .vue-slider-dot-tooltip-wrapper-show {
    opacity: 1;
  }
}
</style>
