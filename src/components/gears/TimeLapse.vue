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

import ControllerButton from "@/components/shared/ControllerButton.vue";

@Component({
  components: {
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
</style>
