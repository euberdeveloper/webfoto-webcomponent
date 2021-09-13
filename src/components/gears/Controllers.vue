<template>
  <div class="controllers" :class="{ 'full-width': showTimeLapse && !legacyTimeLapse }">
    <div class="triangle" :style="arrowStyle" />

    <transition name="fade">
      <div class="time-lapse-legacy controller-block" v-if="showTimeLapse && legacyTimeLapse">
        <controller-button class="button" icon="pause" :disabled="pauseDisabled" @click="$emit('pause')" />
        <controller-button class="button" icon="play" :disabled="playNormalDisabled" @click="$emit('play', 'normal')" />
        <controller-button class="button" icon="fast-play" :disabled="playFastDisabled" @click="$emit('play', 'fast')" />
        <div style="flex: 1" />
        <span class="divider" />
        <div style="flex: 1" />
        <input-text class="quantity" type="number" placeholder="N" v-model="internalTimeLapseQuantity" />
        <input-select class="extent" placeholder="Misura" :options="extentOptions" v-model="internalTimeLapseExtent" />
      </div>
    </transition>

    <div class="controller controller-block" v-if="legacyTimeLapse || !showTimeLapse">
      <incrementor
        class="incrementor"
        :text="day"
        :disabledIncrement="isLastDay"
        :disabledDecrement="isFirstDay"
        @increment="$emit('increment', 'day')"
        @decrement="$emit('decrement', 'day')"
      />
      <span class="text">/</span>
      <incrementor
        class="incrementor"
        :text="month"
        :disabledIncrement="isLastMonth"
        :disabledDecrement="isFirstMonth"
        @increment="$emit('increment', 'month')"
        @decrement="$emit('decrement', 'month')"
      />
      <span class="text">/</span>
      <incrementor
        class="incrementor"
        :text="year"
        :disabledIncrement="isLastYear"
        :disabledDecrement="isFirstYear"
        @increment="$emit('increment', 'year')"
        @decrement="$emit('decrement', 'year')"
      />
      <span class="divider" />
      <incrementor
        class="incrementor"
        :text="hours"
        :disabledIncrement="isLastHour"
        :disabledDecrement="isFirstHour"
        @increment="$emit('increment', 'hours')"
        @decrement="$emit('decrement', 'hours')"
      />
      <span class="text">:</span>
      <incrementor
        class="incrementor"
        :text="minutes"
        :disabledIncrement="isLastMinute"
        :disabledDecrement="isFirstMinute"
        @increment="$emit('increment', 'minutes')"
        @decrement="$emit('decrement', 'minutes')"
      />
      <span class="divider" />
      <controller-button text="Current" :disabled="isLastDate" @click="$emit('current')" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import dayjs from "dayjs";

import { Extent, SelectOption } from "@/types";

import Incrementor from "@/components/shared/Incrementor.vue";
import ControllerButton from "@/components/shared/ControllerButton.vue";
import InputText from "@/components/shared/InputText.vue";
import InputSelect from "@/components/shared/InputSelect.vue";

@Component({
  components: {
    Incrementor,
    ControllerButton,
    InputText,
    InputSelect,
  },
})
export default class Controllers extends Vue {
  /* PROPS */

  @Prop({ type: dayjs.Dayjs, required: true })
  value!: dayjs.Dayjs;

  @Prop({ type: Array, required: true })
  dates!: dayjs.Dayjs[];

  @Prop({ type: Boolean, required: true })
  showTimeLapse!: boolean;

  @Prop({ type: Boolean, required: true })
  legacyTimeLapse!: boolean;

  @Prop({ validator: (v) => v === null || typeof v === "string", required: true })
  timeLapseVelocity!: string | null;

  @Prop({ type: Number, required: true })
  timeLapseQuantity!: number;

  @Prop({ validator: (v) => v === null || typeof v === "string", required: true })
  timeLapseExtent!: Extent;

  /* DATA */

  private extentOptions: SelectOption<Extent>[] = [
    {
      label: "minuti",
      value: "minutes",
    },
    {
      label: "ore",
      value: "hours",
    },
    {
      label: "giorni",
      value: "day",
    },
    {
      label: "mesi",
      value: "month",
    },
    {
      label: "anni",
      value: "year",
    },
  ];

  /* GETTERS AND SETTERS */

  get internalTimeLapseVelocity(): string | null {
    return this.timeLapseVelocity;
  }
  set internalTimeLapseVelocity(value: string | null) {
    this.$emit("update:timeLapseVelocity", value);
  }

  get internalTimeLapseQuantity(): number {
    return this.timeLapseQuantity;
  }
  set internalTimeLapseQuantity(value: number) {
    this.$emit("update:timeLapseQuantity", +value);
  }

  get internalTimeLapseExtent(): Extent {
    return this.timeLapseExtent;
  }
  set internalTimeLapseExtent(value: Extent) {
    this.$emit("update:timeLapseExtent", value);
  }

  get day(): string {
    return this.value.format("ddd DD");
  }
  get month(): string {
    return this.value.format("MM");
  }
  get year(): string {
    return this.value.format("YYYY");
  }
  get hours(): string {
    return this.value.format("HH");
  }
  get minutes(): string {
    return this.value.format("mm");
  }

  get lastDate(): dayjs.Dayjs {
    return this.dates[this.dates.length - 1];
  }
  get firstDate(): dayjs.Dayjs {
    return this.dates[0];
  }

  get isLastDate(): boolean {
    if (this.value === null) {
      return false;
    }

    return this.value.isSame(this.lastDate);
  }
  get isFirstDate(): boolean {
    if (this.value === null) {
      return false;
    }

    return this.value.isSame(this.firstDate);
  }

  get isLastYear(): boolean {
    if (this.value === null) {
      return false;
    }

    return this.value.get("year") === this.lastDate.get("year");
  }
  get isFirstYear(): boolean {
    if (this.value === null) {
      return false;
    }

    return this.value.get("year") === this.firstDate.get("year");
  }

  get isLastMonth(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isLastYear && this.value.get("month") === +this.lastDate.get("month");
  }
  get isFirstMonth(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isFirstYear && this.value.get("month") === this.firstDate.get("month");
  }

  get isLastDay(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isLastMonth && this.value.get("date") === +this.lastDate.get("date");
  }
  get isFirstDay(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isFirstMonth && this.value.get("date") === this.firstDate.get("date");
  }

  get isLastHour(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isLastDay && this.value.get("hour") === +this.lastDate.get("hour");
  }
  get isFirstHour(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isFirstDay && this.value.get("hour") === this.firstDate.get("hour");
  }

  get isLastMinute(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isLastHour && this.value.get("minute") === +this.lastDate.get("minute");
  }
  get isFirstMinute(): boolean {
    if (this.value === null) {
      return false;
    }
    return this.isFirstHour && this.value.get("minute") === this.firstDate.get("minute");
  }

  get arrowStyle(): { borderTop: string; borderBottom: string } {
    return {
      borderTop: this.showTimeLapse ? "#c1092580" : "#1d1d1c80",
      borderBottom: this.showTimeLapse ? "#c1092580" : "#1d1d1c80",
    };
  }

  get pauseDisabled(): boolean {
    return this.timeLapseVelocity === null;
  }
  get playDisabled(): boolean {
    return (this.timeLapseQuantity > 0 && this.isLastDate) || (this.timeLapseQuantity < 0 && this.isFirstDate) || this.timeLapseQuantity === 0;
  }
  get playNormalDisabled(): boolean {
    return this.timeLapseVelocity === "normal" || this.playDisabled;
  }
  get playFastDisabled(): boolean {
    return this.timeLapseVelocity === "fast" || this.playDisabled;
  }

  /* WATCHERS */

  @Watch("playDisabled")
  watchPlayDisabled(): void {
    if (this.playDisabled) {
      this.internalTimeLapseVelocity = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.controllers {
  .triangle {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    display: inline;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 15px solid #1d1d1c80;
    top: -15px;
    width: 0;
  }

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

  .controller {
    background-color: #1d1d1c80;
  }

  .time-lapse-legacy {
    background-color: #c1092580;

    > .quantity {
      width: 40px;
    }

    > .extent {
      margin-left: 8px;
    }
  }

  .incrementor {
    margin: 0 2px;
  }

  .divider {
    height: 80%;
    width: 1px;
    background-color: #9a9ea1;
    margin: 0 10px;
  }

  .text {
    margin: 0 1px;
    color: #c4c5c5;
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
