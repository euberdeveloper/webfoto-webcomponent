<template>
  <div class="controllers">
    <div class="triangle" :style="arrowStyle" />

    <div class="time-lapse" v-if="showTimeLapse">
      <button class="clickable" :disabled="timeLapseVelocity === null" @click="$emit('pause')">Pause</button>
      <button class="clickable" :disabled="timeLapseVelocity === 'normal'" @click="$emit('play', 'normal')">Play</button>
      <button class="clickable" :disabled="timeLapseVelocity === 'fast'" @click="$emit('play', 'fast')">Play fast</button>
    </div>

    <div class="controller">
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
      <button class="clickable" :disabled="isLastDate" @click="$emit('current')">Current</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import dayjs from "dayjs";

import Incrementor from "./Incrementor.vue";

@Component({
  components: {
    Incrementor,
  },
})
export default class Controllers extends Vue {
  /* PROPS */

  @Prop({ type: dayjs.Dayjs, required: true })
  value!: dayjs.Dayjs;

  @Prop({ type: Array, required: true })
  dates!: dayjs.Dayjs[];

  @Prop({ type: Boolean, default: false })
  showTimeLapse!: boolean;

  @Prop({ validator: v => v === null || typeof v === 'string', default: null })
  timeLapseVelocity!: string | null;

  /* GETTERS AND SETTERS */

  get internalValue(): dayjs.Dayjs {
    return this.value;
  }
  set internalValue(value: dayjs.Dayjs) {
    this.$emit("update:value", value);
  }

  get day(): string {
    return this.internalValue.format("ddd DD");
  }
  get month(): string {
    return this.internalValue.format("MM");
  }
  get year(): string {
    return this.internalValue.format("YYYY");
  }
  get hours(): string {
    return this.internalValue.format("HH");
  }
  get minutes(): string {
    return this.internalValue.format("mm");
  }

  get lastDate(): dayjs.Dayjs {
    return this.dates[this.dates.length - 1];
  }
  get firstDate(): dayjs.Dayjs {
    return this.dates[0];
  }

  get isLastDate(): boolean {
    if (this.internalValue === null) {
      return false;
    }

    return this.internalValue.isSame(this.lastDate);
  }

  get isLastYear(): boolean {
    if (this.internalValue === null) {
      return false;
    }

    return this.internalValue.get("year") === this.lastDate.get("year");
  }
  get isFirstYear(): boolean {
    if (this.internalValue === null) {
      return false;
    }

    return this.internalValue.get("year") === this.firstDate.get("year");
  }

  get isLastMonth(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isLastYear && this.internalValue.get("month") === +this.lastDate.get("month");
  }
  get isFirstMonth(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isFirstYear && this.internalValue.get("month") === this.firstDate.get("month");
  }

  get isLastDay(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isLastMonth && this.internalValue.get("date") === +this.lastDate.get("date");
  }
  get isFirstDay(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isFirstMonth && this.internalValue.get("date") === this.firstDate.get("date");
  }

  get isLastHour(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isLastDay && this.internalValue.get("hour") === +this.lastDate.get("hour");
  }
  get isFirstHour(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isFirstDay && this.internalValue.get("hour") === this.firstDate.get("hour");
  }

  get isLastMinute(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isLastHour && this.internalValue.get("minute") === +this.lastDate.get("minute");
  }
  get isFirstMinute(): boolean {
    if (this.internalValue === null) {
      return false;
    }
    return this.isFirstHour && this.internalValue.get("minute") === this.firstDate.get("minute");
  }

  get arrowStyle(): { borderTop: string; borderBottom: string } {
    return {
      borderTop: this.showTimeLapse ? "#c1092580" : "#1d1d1c80",
      borderBottom: this.showTimeLapse ? "#c1092580" : "#1d1d1c80",
    };
  }
}
</script>

<style lang="scss" scoped>
.controllers {
  position: relative;

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

  .controller {
    padding: 0 12px;
    height: 50px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-family: "Exo 2 Medium", sans-serif;
    font-size: 14px;
    color: white;
    background: #1d1d1c80;
  }

  .time-lapse {
    padding: 0 12px;
    height: 50px;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    font-family: "Exo 2 Medium", sans-serif;
    font-size: 14px;
    color: white;

    background-color: #c1092580;
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

  .clickable {
    margin: 0 2px;
    padding: 0;
    border: 0;

    background-color: transparent;
    color: white;
    cursor: pointer;

    &:hover {
      color: red;
    }
    &:active {
      color: #ad0000;
    }
    &:disabled {
      color: #9a9ea1;
    }
  }
}
</style>
